<script setup lang="ts">
type IndexTablePrintProps = {
  columns: { accessorKey: string; text: string }[];
  formValues: { order_list: { id: string; price?: string; number?: string }[] };
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
      <tr v-for="row in props.formValues.order_list" :key="row.id">
        <td v-for="column in props.columns" :key="column.accessorKey">
          <template v-if="column.accessorKey === 'total'">
            {{ Number(row?.price ?? 0) * Number(row?.number ?? 0) }}
          </template>
          <template v-else>
            {{ row[column.accessorKey] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
