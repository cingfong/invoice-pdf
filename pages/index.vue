<script lang="ts" setup>
import IndexFormFillContent from "~/components/index/indexForm/IndexFormFillContent.vue";
import IndexFormTitle from "~/components/index/indexForm/IndexFormTitle.vue";

useForm();

const handleSetFormItem = () => {
  console.log("handleSetFormItem");
};
const handleDeleteFormItem = () => {
  console.log("handleDeleteFormItem");
};

const submit = () => {
  console.log("submit");
};
</script>
<template>
  <form class="max-w-xl mx-auto min-h-screen p-0">
    <div class="bg-white rounded-lg p-5 m-4 shadow-lg backdrop-blur-sm">
      <IndexFormTitle />

      <div class="space-y-4">
        <IndexFormFillContent
          @set-form-item="handleSetFormItem"
          @handle-delete-form-item="handleDeleteFormItem"
        />
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
        class="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none rounded-lg text-base font-semibold mt-5 cursor-pointer transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:translate-y-0 active:shadow-sm"
        @click="submit"
      >
        <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" />
        生成 PDF
      </button>
    </div>
  </form>
</template>
