<script lang="ts" setup>
import { computed, ref, useFormContext, watch } from "#imports";
import { COOKIE_KEY } from "@/constant/cookie";
import { useCookies } from "@vueuse/integrations/useCookies";
import IndexFormModalHistory from "@/components/index/indexForm/indexFormModal/IndexFormModalHistory.vue";
import IndexFormModalLogin from "@/components/index/indexForm/indexFormModal/IndexFormModalLogin.vue";

const { values: formValues, setFieldValue } = useFormContext();

const cookie = useCookies([COOKIE_KEY.TOKEN]);
const token = cookie.get(COOKIE_KEY.TOKEN);

const userAuth = computed(() => !!token);

const isOpen = ref(false);
const formTitle = ref(undefined);

watch(isOpen, (newVal) => {
  if (newVal) {
    formTitle.value = formValues.formTitle;
  } else {
    formTitle.value = undefined;
  }
});

const setFormTitle = () => {
  setFieldValue("formTitle", formTitle.value);
  isOpen.value = false;
};

const formTypeString = computed(() =>
  formValues.formType ? "請款單" : "報價單"
);

const toggleFormType = () => {
  setFieldValue("formType", !formValues.formType);
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="`請輸入${formTypeString}名稱`"
    aria-describedby="login-type-modal"
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
          切換成{{ !formValues.formType ? "請款單" : "報價單" }}
        </UButton>
      </div>
    </template>
    <slot name="default" />
  </UModal>
</template>
