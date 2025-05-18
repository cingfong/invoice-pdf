<script lang="ts" setup>
import { computed, ref, toRaw, useFormContext } from "#imports";
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
    iconColor: "text-indigo-600",
  },
  {
    text: "輸入規格",
    model: "criterion",
    type: "text",
    icon: "i-heroicons-adjustments-vertical",
    iconColor: "text-amber-600",
  },
  {
    text: "輸入數量",
    model: "number",
    type: "number",
    icon: "i-heroicons-calculator",
    iconColor: "text-emerald-600",
  },
  {
    text: "輸入單位",
    model: "unit",
    type: "text",
    icon: "i-heroicons-scale",
    iconColor: "text-violet-600",
  },
  {
    text: "輸入單價",
    model: "price",
    type: "number",
    icon: "i-heroicons-currency-dollar",
    iconColor: "text-rose-600",
  },
  {
    text: "輸入備註",
    model: "remark",
    type: "text",
    icon: "i-heroicons-document-text",
    iconColor: "text-sky-600",
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
const removeFormItem = () => {
  setFieldValue("order_item_index", undefined);
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

const handleAddFormList = () => {
  setFieldValue("order_list", [...formValues.order_list, editOrderItem.value]);
  removeFormItem();
};

const handleUpdateFormList = () => {
  const _orderList = structuredClone(toRaw(formValues.order_list));
  _orderList[formValues.order_item_index] = editOrderItem.value;
  setFieldValue("order_list", _orderList);
  removeFormItem();
};

const handleDeleteFormList = () => {
  const _orderList = structuredClone(toRaw(formValues.order_list));
  _orderList.splice(formValues.order_item_index, 1);
  setFieldValue("order_list", _orderList);
  removeFormItem();
};

const isEdit = computed(() => formValues.order_item_index !== undefined);

const handleInputOrderItem = () => {
  if (!isEdit.value) return;
  const _orderList = structuredClone(toRaw(formValues.order_list));
  const _editItem = structuredClone(toRaw(editOrderItem.value));
  _orderList[formValues.order_item_index] = _editItem;
  setFieldValue("order_list", _orderList);
};
</script>
<template>
  <div v-for="inputItem in inputList" :key="inputItem.model" class="mb-4">
    <label
      :for="inputItem.model"
      class="flex items-center gap-2 mb-1.5 text-slate-700 text-sm font-medium"
    >
      <UIcon
        :name="inputItem.icon"
        class="w-5 h-5"
        :class="inputItem.iconColor"
      />
      {{ inputItem.text }}
    </label>
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <input
      v-model="editOrderItem[inputItem.model as FormItemKey]"
      :type="inputItem.type"
      :placeholder="inputItem.text"
      class="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 bg-slate-50/80 backdrop-blur-sm transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow"
      @input="handleInputOrderItem"
    />
  </div>
  <IndexIndexFormTotal :edit-item="editOrderItem" />
  <IndexFormButtons
    :is-edit="isEdit"
    @add-form-list="handleAddFormList"
    @update-form-list="handleUpdateFormList"
    @delete-form-list="handleDeleteFormList"
    @remove-form-item="removeFormItem"
  />
</template>
