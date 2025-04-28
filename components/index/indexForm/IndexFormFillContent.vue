<script lang="ts" setup>
import { ref, toRaw, useFormContext } from "#imports";
import { watchImmediate } from "@vueuse/core";
import { IndexIndexFormTotal } from "#components";
import IndexFormButtons from "@/components/index/indexForm/IndexFormButtons.vue";
import type { FormItem, FormItemKey } from "~/constant/form";

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

const { values: formValues, setFieldValue } = useFormContext();

const editOrderItem = ref<FormItem>({
  name: "",
  criterion: "",
  number: undefined,
  unit: "",
  price: undefined,
  remark: "",
  itemTotal: undefined,
});

watchImmediate(
  () => formValues.order_item,
  (value) => {
    editOrderItem.value = structuredClone(toRaw(value));
  }
);

const handleAddFormList = () => {
  setFieldValue("order_list", [...formValues.order_list, editOrderItem.value]);

  setFieldValue("order_item", {
    name: "",
    criterion: "",
    number: undefined,
    unit: "",
    price: undefined,
    remark: "",
    itemTotal: undefined,
  });
};

const handleDeleteFormList = () => {
  console.log("deleteFormList");
};

const handleFormDataRemove = () => {
  for (const key in formValues.order_item) {
    formValues.order_item[key as FormItemKey] = undefined;
  }
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
      v-model="editOrderItem[inputItem.model as FormItemKey]"
      :type="inputItem.type"
      :placeholder="inputItem.text"
      class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 bg-slate-50/80 backdrop-blur-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow"
    />
  </div>
  <IndexIndexFormTotal :edit-item="editOrderItem" />
  <IndexFormButtons
    :is-edit="true"
    @add-form-list="handleAddFormList"
    @delete-form-list="handleDeleteFormList"
    @form-item-remove="handleFormDataRemove"
  />
</template>
