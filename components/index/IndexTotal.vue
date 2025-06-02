<script lang="ts" setup>
import { useFormContext } from "#imports";
import { computed } from "vue";
import type { FormItem } from "~/constant/form";
import { initialFormData } from "~/pages/index.vue";

const { values: formValues, resetForm } = useFormContext();

const listTotal = computed(() => {
  return formValues.order_list.reduce(
    (total: number, item: FormItem) =>
      total + Number(item.price ?? 0) * Number(item.number ?? 0),
    0
  );
});

const listTax = computed(() => {
  return Math.round(listTotal.value * 0.05);
});

const listTaxIncluded = computed(() => {
  return Math.round(listTotal.value + listTax.value);
});
const cancelEdit = () => {
  resetForm({
    values: {
      ...initialFormData,
    },
  });
};
</script>
<template>
  <div
    class="mt-5 p-4 bg-slate-100 rounded-xl shadow-md border border-slate-200 backdrop-blur-sm"
  >
    <template v-if="formValues.id">
      <button
        type="button"
        class="w-full px-4 py-2.5 rounded-lg border-none text-sm font-medium cursor-pointer transition-all flex items-center gap-2 justify-center bg-zinc-500 text-white hover:-translate-y-0.5 hover:shadow-md hover:bg-zinc-600 active:translate-y-0 active:shadow-sm mb-3"
        @click="cancelEdit"
      >
        <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
        取消編輯
      </button>
    </template>

    <div
      class="flex items-center gap-2 my-2 p-2 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700"
    >
      <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-red-700" />
      <span>合計：</span>
      <span class="font-semibold text-red-700">{{
        Math.round(listTotal)
      }}</span>
    </div>

    <div
      class="flex items-center gap-2 my-2 p-2 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700"
    >
      <UIcon
        name="i-heroicons-currency-dollar"
        class="w-5 h-5 text-amber-700"
      />
      <span>稅金：</span>
      <span class="font-semibold text-amber-700">{{ listTax }}</span>
    </div>

    <div
      class="flex items-center gap-2 mt-3 pt-3 p-2 text-base font-semibold border-t border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors"
    >
      <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-green-700" />
      <span>總計：</span>
      <span class="font-semibold text-green-700">{{ listTaxIncluded }}</span>
    </div>
  </div>
</template>
