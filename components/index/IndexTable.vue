<script lang="ts" setup>
import { UButton, UIcon } from "#components";
import { h, useFormContext, type VNode } from "#imports";
import type { FormItem } from "~/constant/form";
import IndexTablePrint from "@/components/index/IndexTablePrint.vue";
import type { initialFormData } from "~/pages/index.vue";

type Column = {
  accessorKey: keyof FormItem | "total";
  text: string;
  header: () => VNode;
  meta: { class: { td: string } };
};

const { values: formValues } = useFormContext<typeof initialFormData>();

const columns: Column[] = [
  {
    accessorKey: "name",
    text: "施工項目",
    header: () =>
      h("div", { class: "flex items-center justify-center gap-2" }, [
        h(UIcon, {
          name: "i-heroicons-list-bullet",
          class: "w-4 h-4 text-indigo-600",
        }),
        h("span", "施工項目"),
      ]),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "criterion",
    text: "規格",
    header: () =>
      h("div", { class: "flex items-center justify-center gap-2" }, [
        h(UIcon, {
          name: "i-heroicons-adjustments-vertical",
          class: "w-4 h-4 text-amber-600",
        }),
        h("span", "規格"),
      ]),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "number",
    text: "數量",
    header: () =>
      h("div", { class: "flex items-center justify-center gap-2" }, [
        h(UIcon, {
          name: "i-heroicons-calculator",
          class: "w-4 h-4 text-emerald-600",
        }),
        h("span", "數量"),
      ]),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "unit",
    text: "單位",
    header: () =>
      h("div", { class: "flex items-center justify-center gap-2" }, [
        h(UIcon, {
          name: "i-heroicons-scale",
          class: "w-4 h-4 text-violet-600",
        }),
        h("span", "單位"),
      ]),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "price",
    text: "單價",
    header: () =>
      h("div", { class: "flex items-center justify-center gap-2" }, [
        h(UIcon, {
          name: "i-heroicons-currency-dollar",
          class: "w-4 h-4 text-rose-600",
        }),
        h("span", "單價"),
      ]),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "total",
    text: "小計",
    header: () =>
      h("div", { class: "flex items-center justify-center gap-2" }, [
        h(UIcon, {
          name: "i-heroicons-chart-bar",
          class: "w-4 h-4 text-green-600",
        }),
        h("span", "小計"),
      ]),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "remark",
    text: "備註",
    header: () =>
      h("div", { class: "flex items-center justify-center gap-2" }, [
        h(UIcon, {
          name: "i-heroicons-document-text",
          class: "w-4 h-4 text-sky-600",
        }),
        h("span", "備註"),
      ]),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
];

const { setFieldValue } = useFormContext();
const handleEditItem = (column: FormItem, index: number) => {
  setFieldValue("order_item", column);
  setFieldValue("order_item_index", index);
};
</script>
<template>
  <div>
    <IndexTablePrint :columns="columns" :form-values="formValues" />
    <UTable
      :ui="{
        root: 'overflow-auto',
        base: 'min-w-[560px]',
        th: 'text-gray-800 text-center py-3 text-nowrap',
        tr: 'border-0 border-t-1 border-slate-200',
        tbody: '!border-0',
        td: 'text-center text-gray-500 py-2.5',
      }"
      :columns="columns"
      :data="formValues.order_list"
      class="flex-1"
      empty="暫無歷史記錄"
    >
      <template #name-cell="{ row }">
        <div class="flex justify-start gap-1 items-center">
          <UButton
            color="info"
            variant="outline"
            square
            class="p-1"
            @click="handleEditItem(row.original as FormItem, row.index)"
          >
            <UIcon name="i-heroicons-pencil-square-20-solid" class="w-5 h-5" />
          </UButton>
          <p>{{ row.original.name }}</p>
        </div>
      </template>
      <template #total-cell="{ row }">
        <p>
          {{
            Math.round(
              Number(row.original.price ?? 0) * Number(row.original.number ?? 0)
            )
          }}
        </p>
      </template>
    </UTable>
  </div>
</template>
