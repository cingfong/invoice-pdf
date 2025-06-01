import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import font from "./ch-normal";

const callAddFont = function(this: jsPDF) {
  this.addFileToVFS('ch-normal.ttf', font);
  this.addFont('ch-normal.ttf', 'ch', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])


export const createPDF = async (otherData: {
  orderTitle: string;
  listTotal: number;
  listTax: number;
  listTaxIncluded: number;
  companyName?: string;
  address?: string;
  phone?: string;
  seal?: string;
}) => {
  
  const doc = new jsPDF("p");
  const width = doc.internal.pageSize.getWidth();
  doc.setFont("ch");
  doc.setFontSize(16);
  doc.text(otherData.orderTitle, width / 2, 12, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.text(otherData.companyName ?? "", 15, 20, { align: "left" });
  doc.text(otherData.address ?? "", 15, 24, { align: "left" });
  doc.text(otherData.phone ?? "", 15, 28, { align: "left" });

  const img = new Image();
  if (otherData.seal) {
    img.src = otherData.seal;
  } else {
    img.src = "/images/space.png";
  }

  return new Promise((resolve) => {
    img.onload = () => {
      autoTable(doc, {
        html: "#pdf-table",
        styles: {
          font: "ch",
          fontStyle: "normal",
        },
        margin: { top: 32 },
      });

      autoTable(doc, {
        body: [
          ["", "合計 : ", otherData.listTotal],
          ["", "稅金 : ", otherData.listTax],
          ["", "總計 : ", otherData.listTaxIncluded],
          ["", "", ""],
        ],
        styles: {
          font: "ch",
          halign: "center",
          fillColor: [255, 255, 255],
        },
        alternateRowStyles: { fillColor: [255, 255, 255] },
        columnStyles: {
          0: { cellWidth: "auto", fillColor: [255, 255, 255] },
          1: {
            cellWidth: 15,
            fillColor: [255, 255, 255],
          },
          2: {
            cellWidth: 27,
            halign: "right",
            fillColor: [255, 255, 255],
          },
        },
        didDrawCell: function (data) {
          if (
            data.column.index === 2 &&
            data.row.index === 2 &&
            data.cell.section === "body"
          ) {
            doc.addImage(img.src, data.cell.x + 2, data.cell.y + 15, 30, 30);
          }
        },
      });

      doc.save(`${otherData.orderTitle}.pdf`);
      resolve(true);
    };
  });
};