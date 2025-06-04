<script lang="ts" setup>
import { useAsyncData } from "#app";
import { useForm } from "#imports";
import { computed } from "vue";
import { whenever } from "@vueuse/core";
import { createPDF } from "~/utils/createPdf";
import { useCookies } from "@vueuse/integrations/useCookies";
import IndexFormFillContent from "~/components/index/indexForm/IndexFormFillContent.vue";
import IndexFormTitle from "~/components/index/indexForm/IndexFormTitle.vue";
import IndexTable from "~/components/index/IndexTable.vue";
import IndexTotal from "~/components/index/IndexTotal.vue";
import { COOKIE_KEY } from "~/constant/cookie";
import type { FormItem } from "~/constant/form";
import type { UserInfo } from "~/server/api/userInfo.get";

// #region 取得使用者資訊
const cookie = useCookies([COOKIE_KEY.TOKEN]);
const token = computed(() => cookie.get(COOKIE_KEY.TOKEN));

const { data: userInfo, execute } = await useAsyncData(
  "usersInfo",
  () =>
    $fetch<UserInfo>(`/api/userInfo?token=${token.value}`, {
      method: "GET",
    }),
  {
    server: false,
    immediate: true,
    transform: (data) => data,
  }
);

whenever(token, () => {
  if (token.value) execute();
});
// #endregion

// #region 初始化表單
useForm({
  initialValues: { ...initialFormData },
});

const { values: formValues, resetForm } = useForm({
  initialValues: { ...initialFormData },
});
// #endregion

// #region 計算總金額
const formTitle = computed(() => formValues.order_title);
const formTypeString = computed(() =>
  formValues.order_type ? "請款單" : "報價單"
);

// #region 計算總金額
const listTotal = computed(() => {
  return formValues.order_list.reduce(
    (total: number, item: FormItem) =>
      Math.round(total + Number(item.price ?? 0) * Number(item.number ?? 0)),
    0
  );
});
// #endregion

// #region 計算稅額
const listTax = computed(() => {
  return Math.round(listTotal.value * 0.05);
});

const listTaxIncluded = computed(() => {
  return listTotal.value + listTax.value;
});
// #endregion

// #region 更新訂單
const handleUpdateOrder = () => {
  return $fetch("/api/updateOrder", {
    method: "PATCH",
    body: {
      id: formValues.id,
      order_list: formValues.order_list,
      order_title: formTitle.value,
      order_type: formValues.order_type,
      token: token.value,
      user_id: userInfo.value?.id,
      is_visible: true,
    },
  });
};
// #endregion

// #region 新增訂單
const handleCreateOrder = () => {
  return $fetch("/api/createOrder", {
    method: "POST",
    body: {
      order_list: formValues.order_list,
      order_title: formTitle.value,
      order_type: formValues.order_type,
      token: token.value,
      user_id: userInfo.value?.id,
      is_visible: true,
    },
  });
};
// #endregion

// #region 生成 PDF
const submit = async () => {
  if (token.value) {
    if (formValues.id) await handleUpdateOrder();
    else await handleCreateOrder();
  }

  await createPDF({
    orderTitle: `${formTitle.value}${formTypeString.value}`,
    listTotal: listTotal.value,
    listTax: listTax.value,
    listTaxIncluded: listTaxIncluded.value,
    companyName: userInfo.value?.company,
    address: userInfo.value?.address,
    phone: userInfo.value?.phone,
    seal: userInfo.value?.img_base64,
  });

  // 重置表單
  resetForm({
    values: {
      ...initialFormData,
    },
  });
};
// #endregion
</script>
<script lang="ts">
export const initialFormData = {
  id: undefined,
  order_list: [] as FormItem[],
  order_title: "",
  order_type: false,
  user_id: undefined,
  order_item: {
    name: undefined,
    criterion: undefined,
    number: undefined,
    unit: undefined,
    price: undefined,
    remark: undefined,
    itemTotal: undefined,
  } as FormItem,
  order_item_index: undefined,
};
</script>
<template>
  <form class="max-w-xl mx-auto min-h-screen p-0">
    <div
      class="bg-slate-200 bg-opacity-90 rounded-lg p-5 m-4 shadow-lg backdrop-blur-sm"
    >
      <!-- 表單標題 -->
      <IndexFormTitle />

      <!-- 表單填寫內容 -->
      <div class="space-y-4">
        <IndexFormFillContent />
      </div>

      <!-- 施工項目表格 -->
      <div class="my-5 rounded-xl overflow-hidden bg-white shadow-md">
        <IndexTable />
      </div>

      <!-- 表單展示內容 -->
      <IndexTotal />

      <!-- 生成 PDF 按鈕 -->
      <button
        type="button"
        class="w-full py-3.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white border-none rounded-lg text-base font-semibold mt-5 cursor-pointer transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:from-blue-800 hover:to-blue-900 active:translate-y-0 active:shadow-sm"
        @click="submit"
      >
        <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" />
        生成 PDF
      </button>
    </div>
  </form>
</template>
