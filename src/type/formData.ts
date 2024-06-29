export type formData = {
  // 項目名稱
  name: string | null;
  // 規格
  spec: string | null;
  // 數量
  number: number | null;
  // 單位
  unit: string | null;
  // 價格
  price: number | null;
  // 小計
  itemTotal: number | null;
  // 備註
  remark: string | null;
}

export type totalData = {
  // 合計
  listTotal: number | undefined;
  // 稅金
  listTax: number | undefined;
  // 總計
  listTaxIncluded: number | undefined;
}

export const enum FORM_TYPE {
  // 請款
  INVOICE = 0,

  // 報價
  QUOTE

}