<script lang="ts" setup>
const { values: formValues, setFieldValue } = useFormContext();

// TODO: 待補
const userAuth = ref(false);

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

const handleLogin = () => {
  console.log("handleLogin");
};

const handleHistory = () => {
  console.log("handleHistory");
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="`請輸入${formTypeString}名稱`"
    aria-describedby=""
  >
    <template #body>
      <div class="flex flex-col gap-y-4">
        <div class="flex gap-2">
          <template v-if="userAuth">
            <LoginModal>
              <UButton
                block
                color="warning"
                variant="outline"
                icon="i-heroicons-user"
                class="transition-colors"
                @click="handleLogin"
              >
                登入帳號
              </UButton>
            </LoginModal>
          </template>
          <template v-else>
            <HistoryModal>
              <UButton
                block
                color="secondary"
                variant="solid"
                icon="i-heroicons-clock"
                class="transition-colors"
                @click="handleHistory"
              >
                搜尋歷史紀錄
              </UButton>
            </HistoryModal>
          </template>
        </div>

        <!-- <UFormGroup> -->
        <UInput
          v-model:model-value="formTitle"
          :placeholder="`請輸入${formTypeString}名稱`"
          class="w-full focus:border-primary-500"
        />
        <!-- </UFormGroup> -->
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
