<script lang="ts" setup>
type FormButtonProps = {
  isEdit: boolean;
};
type FormButtonsEmit = {
  (
    e: "addFormList" | "deleteFormList" | "removeFormItem" | "updateFormList"
  ): void;
};

const emit = defineEmits<FormButtonsEmit>();
const props = defineProps<FormButtonProps>();
</script>
<template>
  <div class="flex gap-3 justify-between">
    <template v-if="!props.isEdit">
      <button
        type="button"
        class="px-4 py-2.5 rounded-lg border-none text-sm font-medium cursor-pointer transition-all flex items-center gap-2 justify-center bg-blue-600 text-white hover:-translate-y-0.5 hover:shadow-md hover:bg-blue-700 active:translate-y-0 active:shadow-sm"
        @click="emit('addFormList')"
      >
        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
        新增
      </button>

      <button
        type="button"
        class="px-4 py-2.5 rounded-lg border-none text-sm font-medium cursor-pointer transition-all flex items-center gap-2 justify-center bg-red-600 text-white hover:-translate-y-0.5 hover:shadow-md hover:bg-red-700 active:translate-y-0 active:shadow-sm"
        @click="emit('removeFormItem')"
      >
        <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
        清空
      </button>
    </template>

    <template v-else>
      <button
        type="button"
        class="px-4 py-2.5 rounded-lg border-none text-sm font-medium cursor-pointer transition-all flex items-center gap-2 justify-center bg-blue-600 text-white hover:-translate-y-0.5 hover:shadow-md hover:bg-blue-700 active:translate-y-0 active:shadow-sm"
        @click="emit('updateFormList')"
      >
        <UIcon name="i-heroicons-plus" class="w-4 h-4" />
        儲存
      </button>

      <button
        type="button"
        class="px-4 py-2.5 rounded-lg border-none text-sm font-medium cursor-pointer transition-all flex items-center gap-2 justify-center bg-red-600 text-white hover:-translate-y-0.5 hover:shadow-md hover:bg-red-700 active:translate-y-0 active:shadow-sm"
        @click="emit('deleteFormList')"
      >
        <UIcon name="i-heroicons-trash" class="w-4 h-4" />
        刪除
      </button>
    </template>
  </div>
</template>
