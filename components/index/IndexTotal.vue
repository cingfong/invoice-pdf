<script lang="ts" setup>
import { useFormContext } from "#imports";
import { computed } from "vue";
import type { FormItem } from "~/constant/form";

const { values: formValues } = useFormContext();

const listTotal = computed(() => {
  return formValues.order_list.reduce(
    (total: number, item: FormItem) => total + (Number(item.price) as number),
    0
  );
});

const listTax = computed(() => {
  return +(listTotal.value * 0.05).toFixed(2);
});

const listTaxIncluded = computed(() => {
  return listTotal.value + listTax.value;
});
const cancelEdit = () => {
  console.log("cancelEdit");
};
</script>
<template>
  <div
    class="mt-5 p-4 bg-slate-50 rounded-xl shadow-md border border-slate-200"
  >
    <!-- TODO: -->
    <!-- v-if="editHistoryData" -->
    <button
      type="button"
      class="w-full px-4 py-2.5 rounded-lg border-none text-sm font-medium cursor-pointer transition-all flex items-center gap-2 justify-center bg-slate-600 text-white hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-700 active:translate-y-0 active:shadow-sm mb-3"
      @click="cancelEdit"
    >
      <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
      取消編輯
    </button>

    <div class="flex items-center gap-2 my-2 text-sm text-slate-700">
      <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-red-600" />
      <span>合計：</span>
      <span class="font-semibold text-red-600">{{ listTotal }}</span>
    </div>

    <div class="flex items-center gap-2 my-2 text-sm text-slate-700">
      <UIcon
        name="i-heroicons-currency-dollar"
        class="w-5 h-5 text-amber-600"
      />
      <span>稅金：</span>
      <span class="font-semibold text-amber-600">{{ listTax }}</span>
    </div>

    <div
      class="flex items-center gap-2 mt-3 pt-3 text-base font-semibold border-t border-slate-300 text-slate-800"
    >
      <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-green-600" />
      <span>總計：</span>
      <span class="font-semibold text-green-600">{{ listTaxIncluded }}</span>
    </div>
  </div>
</template>
