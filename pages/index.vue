<script lang="ts" setup>
import { useForm } from "#imports";
import IndexFormFillContent from "~/components/index/indexForm/IndexFormFillContent.vue";
import IndexFormTitle from "~/components/index/indexForm/IndexFormTitle.vue";
import IndexTable from "~/components/index/IndexTable.vue";
import IndexTotal from "~/components/index/IndexTotal.vue";
import type { FormItem } from "~/constant/form";

useForm({
  initialValues: { ...initialFormData },
});

const submit = () => {
  console.log("submit");
};
</script>
<script lang="ts">
export const initialFormData = {
  id: undefined,
  order_list: [] as FormItem[],
  order_title: "",
  order_type: false,
  user_id: undefined,
  order_item: {
    name: undefined,
    criterion: undefined,
    number: undefined,
    unit: undefined,
    price: undefined,
    remark: undefined,
    itemTotal: undefined,
  } as FormItem,
  order_item_index: undefined,
};
</script>
<template>
  <form class="max-w-xl mx-auto min-h-screen p-0">
    <div
      class="bg-slate-200 bg-opacity-90 rounded-lg p-5 m-4 shadow-lg backdrop-blur-sm"
    >
      <IndexFormTitle />
      <div class="space-y-4">
        <IndexFormFillContent />
      </div>

      <!-- Items Table -->
      <div
        class="my-5 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-md"
      >
        <IndexTable />
      </div>

      <!-- Total Section -->
      <IndexTotal />
      <button
        class="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white border-none rounded-lg text-base font-semibold mt-5 cursor-pointer transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:from-blue-800 hover:to-blue-900 active:translate-y-0 active:shadow-sm"
        @click="submit"
      >
        <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" />
        生成 PDF
      </button>
    </div>
  </form>
</template>
