<script setup lang="ts">
import type { FormItem } from "~/constant/form";
import type { initialFormData } from "~/pages/index.vue";

type Column = {
  accessorKey: keyof FormItem | "total";
  text: string;
};

type IndexTablePrintProps = {
  columns: Column[];
  formValues: typeof initialFormData;
};

const props = defineProps<IndexTablePrintProps>();
</script>
<template>
  <table id="pdf-table" class="sr-only">
    <thead>
      <tr>
        <th v-for="column in props.columns" :key="column.accessorKey">
          {{ column.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in props.formValues.order_list"
        :key="rowIndex"
      >
        <td v-for="column in props.columns" :key="column.accessorKey">
          <template v-if="column.accessorKey === 'total'">
            {{ Math.round(Number(row?.price ?? 0) * Number(row?.number ?? 0)) }}
          </template>
          <template v-else>
            {{ row[column.accessorKey] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
