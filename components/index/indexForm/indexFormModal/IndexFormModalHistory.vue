<script lang="ts" setup>
const historyList = ref([]);
const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="歷史記錄"
    aria-describedby="history-modal"
  >
    <template #body>
      <div class="max-h-96 overflow-y-auto">
        <UTable :rows="historyList" empty="暫無歷史記錄">
          有資料
          <!-- <template #updated_at-data="{ row }">
            {{ formatDate(row.updated_at) }}
          </template> -->

          <!-- <template #actions-data="{ row }"> -->
          <!-- <UButton
              size="xs"
              color="primary"
              icon="i-heroicons-pencil"
              @click="editItem(row)"
            >
              編輯
            </UButton> -->
          <!-- </template> -->
        </UTable>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton color="gray" variant="outline" @click="closeModal">
          關閉
        </UButton>
      </div>
    </template>
    <slot name="default" />
  </UModal>
</template>
