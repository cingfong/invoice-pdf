<script lang="ts" setup>
import { computed, useFormContext } from "#imports";
import IndexFormModalTitle from "~/components/index/indexForm/indexFormModal/IndexFormModalTitle.vue";

const { values: formValues } = useFormContext();

const formTypeString = computed(() =>
  formValues.order_type ? "請款單 " : "報價單"
);
</script>
<template>
  <div class="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200">
    <IndexFormModalTitle>
      <button
        type="button"
        class="bg-transparent border-none flex items-center justify-center text-slate-500 cursor-pointer p-1 rounded-full transition-all hover:bg-slate-100 hover:text-slate-800 hover:rotate-12"
      >
        <UIcon name="i-heroicons-pencil-solid" class="w-6 h-6" />
      </button>
    </IndexFormModalTitle>
    <h1 class="text-xl font-semibold text-slate-800 m-0">
      {{ formValues.formTitle }}{{ formTypeString }}
    </h1>
  </div>
</template>
