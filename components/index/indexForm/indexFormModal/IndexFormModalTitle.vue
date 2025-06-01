<script lang="ts" setup>
import { computed, ref, useFormContext, watch } from "#imports";
import { COOKIE_KEY } from "@/constant/cookie";
import { useCookies } from "@vueuse/integrations/useCookies";
import IndexFormModalHistory from "@/components/index/indexForm/indexFormModal/IndexFormModalHistory.vue";
import IndexFormModalLogin from "@/components/index/indexForm/indexFormModal/IndexFormModalLogin.vue";

const cookie = useCookies([COOKIE_KEY.TOKEN]);
const userAuth = computed(() => !!cookie.get(COOKIE_KEY.TOKEN));

const { values: formValues, setFieldValue } = useFormContext();

const toggleFormType = () => {
  setFieldValue("order_type", !formValues.order_type);
};

const formTypeString = computed(() =>
  formValues.order_type ? "請款單" : "報價單"
);

const isOpen = ref(false);
const formTitle = ref(undefined);

// 關閉彈窗時，清空 input 資料
watch(isOpen, (newVal) => {
  if (newVal) {
    formTitle.value = formValues.order_title;
  } else {
    formTitle.value = undefined;
  }
});

const setFormTitle = () => {
  setFieldValue("order_title", formTitle.value);
  isOpen.value = false;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="`請輸入${formTypeString}名稱`"
    description="請輸入報價單或請款單名稱"
  >
    <template #body>
      <div class="flex flex-col gap-y-4">
        <div class="flex gap-2">
          <template v-if="!userAuth">
            <IndexFormModalLogin>
              <UButton
                block
                color="warning"
                variant="outline"
                icon="i-heroicons-user"
                class="transition-colors"
              >
                登入帳號
              </UButton>
            </IndexFormModalLogin>
          </template>
          <template v-else>
            <IndexFormModalHistory @close-modal="closeModal">
              <UButton
                block
                color="secondary"
                variant="solid"
                icon="i-heroicons-clock"
                class="transition-colors"
              >
                搜尋歷史紀錄
              </UButton>
            </IndexFormModalHistory>
          </template>
        </div>

        <UInput
          v-model:model-value="formTitle"
          :placeholder="`請輸入${formTypeString}名稱`"
          class="w-full focus:border-primary-500"
        />
      </div>
    </template>

    <template #footer>
      <div class="w-full flex justify-between gap-2">
        <UButton
          color="success"
          variant="subtle"
          class="transition-colors"
          @click="setFormTitle"
        >
          確定
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          icon="i-heroicons-arrow-path"
          class="transition-colors"
          @click="toggleFormType"
        >
          切換成{{ formValues.order_type ? "報價單" : "請款單" }}
        </UButton>
      </div>
    </template>
    <slot name="default" />
  </UModal>
</template>
