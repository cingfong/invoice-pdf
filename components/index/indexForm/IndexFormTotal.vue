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
  return (_itemPrice * 100 * _itemNumber * 100) / 10000;
});
</script>
<template>
  <div
    class="my-4 text-base text-slate-700 flex items-center gap-2 p-3 bg-blue-50 rounded-lg shadow-sm backdrop-blur-sm border border-blue-100"
  >
    <UIcon name="i-heroicons-calculator" class="w-5 h-5 text-blue-600" />
    <span>小計：</span>
    <span class="font-semibold text-blue-600">{{ itemTotal }}</span>
  </div>
</template>
