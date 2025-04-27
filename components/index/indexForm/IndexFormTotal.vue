<script lang="ts" setup>
const { values: formValues } = useForm();

const itemTotal = computed(() => {
  return (formValues.price * 100 * formValues.number * 100) / 10000;
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
