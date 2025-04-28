<script setup lang="ts">
import { useForm } from '#imports';
import { computed, ref, watch } from 'vue';

const isOpen = ref(false);

const {
  values: formValues,
  handleSubmit,
  setFieldValue,
} = useForm({
  initialValues: {
    password: undefined,
  },
});

const password = computed({
  get() {
    return formValues.password;
  },
  set(value) {
    setFieldValue("password", value);
  },
});

const handleClose = () => {
  isOpen.value = false;
};
watch(isOpen, (newVal) => {
  if (!newVal) {
    setFieldValue("password", undefined);
  }
});

const onLogin = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <UModal v-model:open="isOpen" title="登入" aria-describedby="login-modal">
    <template #body>
      <form class="flex flex-col gap-y-4">
        <UFormField label="密碼" required>
          <UInput
            v-model:model-value="password"
            class="w-full"
            placeholder="輸入密碼"
            @keyup.enter="onLogin"
          />
        </UFormField>
      </form>
    </template>
    <template #footer>
      <div class="flex w-full justify-between gap-2">
        <UButton color="neutral" variant="outline" @click="handleClose">
          取消
        </UButton>
        <UButton
          color="primary"
          :disabled="!formValues.password"
          @click="onLogin"
        >
          登入
        </UButton>
      </div>
    </template>
    <slot name="default" />
  </UModal>
</template>
