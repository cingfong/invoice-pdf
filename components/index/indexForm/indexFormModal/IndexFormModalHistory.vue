<script lang="ts" setup>
import { ref, onMounted, h } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import { UButton } from "#components";
import { useFormContext } from "#imports";
import { useCookies } from "@vueuse/integrations/useCookies";
import { COOKIE_KEY } from "~/constant/cookie";
import type { FormOrderBody } from "~/server/api/updateOrder.patch";

type IndexFormModalHistoryEmits = {
  (e: "closeModal"): void;
};

const emit = defineEmits<IndexFormModalHistoryEmits>();

const { resetForm } = useFormContext();

const isOpen = ref(false);

const historyList = ref<FormOrderBody[]>([]);

const cookie = useCookies([COOKIE_KEY.TOKEN]);
const token = cookie.get(COOKIE_KEY.TOKEN);

onMounted(() => {
  if (token) {
    $fetch("/api/history", {
      method: "GET",
    }).then((res) => {
      historyList.value = res;
    });
  }
});

const closeModal = () => {
  isOpen.value = false;
};

const handleEditItem = (formOrderBody: FormOrderBody) => {
  resetForm({ values: formOrderBody });
};

const handleDeleteItem = (id: number) => {
  console.log("delete", id);
};

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
            onClick: () => {
              handleDeleteItem(row.index);
              emit("closeModal");
            },
          }),
        ]
      );
    },
  },
];
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="歷史記錄"
    aria-describedby="history-modal"
  >
    <template #body>
      <div class="max-h-96 overflow-y-auto">
        <UTable
          :columns="columns as TableColumn<FormOrderBody>[]"
          :data="historyList"
          class="flex-1"
          empty="暫無歷史記錄"
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
