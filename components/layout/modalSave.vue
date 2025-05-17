<script lang="ts" setup>
const isOpen = defineModel<boolean>({
  required: true,
});

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <UModal v-model:open="isOpen" aria-describedby="save-modal">
    <template #header>
      <div class="flex w-full items-center justify-center">
        <h3 class="text-lg font-medium text-gray-100">儲存成功</h3>
      </div>
      <div class="absolute top-4 right-4">
        <UIcon name="i-lucide:x" class="size-6 text-white" />
      </div>
    </template>

    <template #body>
      <div class="flex flex-col items-center justify-center gap-4">
        <UIcon
          name="i-heroicons-check-circle"
          class="text-2xl text-green-500"
        />
        <p class="text-base text-gray-300">您的資料已成功儲存</p>
      </div>
    </template>

    <template #footer>
      <div class="w-full">
        <UButton
          block
          color="primary"
          class="transition-all duration-200 hover:shadow-md"
          @click="closeModal"
        >
          確定
        </UButton>
      </div>
    </template>
  </UModal>
</template>
