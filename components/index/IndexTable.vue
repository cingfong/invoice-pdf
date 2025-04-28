<script lang="ts" setup>
import { UButton, UIcon } from "#components";
import { h, useFormContext } from "#imports";
import type { FormItem } from "~/constant/form";

const { values: formValues } = useFormContext();

const columns = [
  {
    accessorKey: "name",
    header: "施工項目",
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "criterion",
    header: () => h("div", { class: "text-center" }, "規格"),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "number",
    header: () => h("div", { class: "text-center" }, "數量"),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "unit",
    header: () => h("div", { class: "text-center" }, "單位"),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "price",
    header: () => h("div", { class: "text-center" }, "單價"),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
  {
    accessorKey: "remark",
    header: () => h("div", { class: "text-center" }, "備註"),
    meta: {
      class: {
        td: "w-[120px]",
      },
    },
  },
];

const { setFieldValue } = useFormContext();
const handleEditItem = (column: FormItem, index: number) => {
  console.log(column, index);
  setFieldValue("order_item", column);
};
</script>
<template>
  <UTable
    :ui="{
      root: 'overflow-auto',
      base: 'min-w-[560px]',
      th: 'text-gray-800 text-center',
      td: 'text-center',
    }"
    :columns="columns"
    :data="formValues.order_list"
    class="flex-1"
    empty="暫無歷史記錄"
  >
    <!-- 用 slot 來自訂 name 欄位 -->
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
  </UTable>
</template>
