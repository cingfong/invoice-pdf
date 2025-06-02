<script lang="ts" setup>
import { computed } from "vue";
import type { FormItem } from "~/constant/form";

const props = defineProps<{
  editItem: FormItem;
}>();

const itemTotal = computed(() => {
  const _itemPrice = (props.editItem.price ?? 0) as number;
  const _itemNumber = (props.editItem.number ?? 0) as number;
  // 處理雙晶浮點數
  return (_itemPrice * 1000 * (_itemNumber * 1000)) / 1000000;
});
</script>
<template>
  <div
    class="my-4 text-base text-slate-700 flex items-center gap-2 p-3 bg-emerald-50 bg-opacity-80 rounded-lg shadow-sm backdrop-blur-sm border border-emerald-200"
  >
    <UIcon name="i-heroicons-calculator" class="w-5 h-5 text-emerald-600" />
    <span>小計：</span>
    <span class="font-semibold text-emerald-700">
      {{ Math.round(itemTotal) }}
    </span>
  </div>
</template>
