<script lang="ts">
export type FormItem = {
  name: string;
  criterion: string;
  number: string;
  unit: string;
  price: string;
  remark: string;
};
</script>
<script lang="ts" setup>
type FillContentEmit = {
  setFormItem: (content: FormItem) => void;
};

const emit = defineEmits<FillContentEmit>();

const inputList = [
  {
    text: "輸入項目",
    model: "name",
    type: "text",
    icon: "i-heroicons-list-bullet",
  },
  {
    text: "輸入規格",
    model: "criterion",
    type: "text",
    icon: "i-heroicons-adjustments-vertical",
  },
  {
    text: "輸入數量",
    model: "number",
    type: "number",
    icon: "i-heroicons-calculator",
  },
  { text: "輸入單位", model: "unit", type: "text", icon: "i-heroicons-scale" },
  {
    text: "輸入單價",
    model: "price",
    type: "number",
    icon: "i-heroicons-currency-dollar",
  },
  {
    text: "輸入備註",
    model: "remark",
    type: "text",
    icon: "i-heroicons-document-text",
  },
];

const currentFormData = ref<FormItem>({
  name: "",
  criterion: "",
  number: "",
  unit: "",
  price: "",
  remark: "",
});

const handleAddFormList = () => {
  console.log("addFormList");
  emit("setFormItem", currentFormData.value);
};

const handleDeleteFormList = () => {
  console.log("deleteFormList");
  emit("setFormItem", currentFormData.value);
};

const handleFormDataRemove = () => {
  console.log("formDataRemove");
};
</script>
<template>
  <div v-for="inputItem in inputList" :key="inputItem.model" class="mb-4">
    <label
      :for="inputItem.model"
      class="flex items-center gap-2 mb-1.5 text-slate-700 text-sm font-medium"
    >
      <UIcon :name="inputItem.icon" class="w-5 h-5 text-blue-600" />
      {{ inputItem.text }}
    </label>
    <input
      v-model="currentFormData[inputItem.model as keyof typeof currentFormData]"
      :type="inputItem.type"
      :placeholder="inputItem.text"
      class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 bg-slate-50/80 backdrop-blur-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow"
      required
    >
  </div>
  <IndexIndexFormTotal />
  <IndexFormButtons
    :is-edit="true"
    @add-form-list="handleAddFormList"
    @delete-form-list="handleDeleteFormList"
    @form-data-remove="handleFormDataRemove"
  />
</template>
