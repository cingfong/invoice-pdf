<script lang="ts" setup>
import { ref, onMounted, h, computed } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import { UButton } from "#components";
import { useFormContext, useOverlay } from "#imports";
import { useCookies } from "@vueuse/integrations/useCookies";
import { COOKIE_KEY } from "~/constant/cookie";
import type { FormOrderBody } from "~/server/api/updateOrder.patch";
import ModalDelete from "~/components/layout/modalDelete.vue";

type IndexFormModalHistoryEmits = {
  (e: "closeModal"): void;
};

const emit = defineEmits<IndexFormModalHistoryEmits>();

const cookie = useCookies([COOKIE_KEY.TOKEN]);
const token = computed(() => cookie.get(COOKIE_KEY.TOKEN));

const { resetForm } = useFormContext();

// 當前彈窗是否開啟
const isOpen = ref(false);
const isHistoryLoading = ref(true);

// 歷史記錄列表
const historyList = ref<FormOrderBody[]>([]);

// 當前表單資料
const { values: formValues } = useFormContext();

// 獲取歷史記錄列表
onMounted(() => {
  if (token.value) {
    $fetch("/api/history", {
      method: "GET",
    }).then((res) => {
      historyList.value = res;
      isHistoryLoading.value = false;
    });
  }
});

const closeModal = () => {
  isOpen.value = false;
  emit("closeModal");
};

const handleEditItem = (formOrderBody: FormOrderBody) => {
  resetForm({ values: formOrderBody });
};

// #region 刪除彈窗
const overlay = useOverlay();
const modal = overlay.create(ModalDelete, {
  props: {
    onCloseModal: () => {
      modal.close();
    },
  },
});
// #endregion

// #region 刪除歷史記錄
const handleDeleteItem = (id: number) => {
  $fetch(`/api/deleteOrder`, {
    method: "DELETE",
    body: { id, token: token.value },
  }).then(() => {
    modal.open();
  });
};
// #endregion

// #region 歷史記錄列表
const columns = [
  {
    accessorKey: "updated_at",
    header: "上次編輯時間",
    cell: ({ row }: { row: TableRow<FormOrderBody> }) => {
      const date = new Date(row.original.updated_at);
      return (
        date.toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) +
        " " +
        date.toLocaleTimeString("zh-TW", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    },
  },
  {
    accessorKey: "order_title",
    header: "抬頭名稱",
    cell: ({ row }: { row: TableRow<FormOrderBody> }) => {
      return h(
        "div",
        { class: "text-center" },
        `${row.original.order_title}${row.original.order_type ? "請款單" : "報價單"}`
      );
    },
  },
  {
    accessorKey: "action",
    header: () => h("div", { class: "text-center" }, "操作"),
    cell: ({ row }: { row: TableRow<FormOrderBody> }) => {
      return h(
        "div",
        {
          class: "flex justify-end gap-2",
        },
        [
          h(UButton, {
            color: "info",
            variant: "outline",
            square: true,
            label: "編輯",
            class: row.original.id === formValues.id ? "!opacity-30" : "",
            disabled: row.original.id === formValues.id,
            onClick: () => {
              handleEditItem(row.original);
              isOpen.value = false;
              emit("closeModal");
            },
          }),
          h(UButton, {
            color: "error",
            variant: "subtle",
            square: true,
            label: "刪除",
            class: row.original.id === formValues.id ? "!opacity-30" : "",
            disabled: row.original.id === formValues.id,
            onClick: () => {
              handleDeleteItem(row.original.id);
              emit("closeModal");
            },
          }),
        ]
      );
    },
  },
] as TableColumn<FormOrderBody>[];
// #endregion
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="歷史記錄"
    description="請選擇要編輯的歷史記錄"
    aria-describedby="history-modal"
  >
    <template #body>
      <div class="max-h-96 overflow-y-auto">
        <UTable
          :loading="isHistoryLoading"
          :data="historyList"
          class="flex-1"
          empty="暫無歷史記錄"
          :columns="columns"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton color="neutral" variant="outline" @click="closeModal">
          關閉
        </UButton>
      </div>
    </template>
    <slot name="default" />
  </UModal>
</template>
