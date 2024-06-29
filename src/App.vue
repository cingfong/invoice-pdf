<script setup lang="ts">
import { ref, computed, Ref } from "vue";
// import CustomButton from "./components/atomic/CustomButton.vue";
import OrderTable from "./components/OrderTable.vue";
import OrderForm from "./components/OrderForm.vue";
import HistoryModal from "./components/HistoryModal.vue";
import TotalBlock from "./components/TotalBlock.vue";
import { type formData, type totalData, FORM_TYPE } from "./type/formData";

const orderList: Ref<formData[]> = ref([]);
const formName = ref("");

const formType: Ref<FORM_TYPE> = ref(FORM_TYPE.INVOICE);

// 新增請款項目
const addOrder = (data: formData): void => {
  orderList.value.push(data);
};

// 總計計算
const totalData: Ref<totalData> = computed(() => {
  return {
    listTotal: undefined,
    listTax: undefined,
    listTaxIncluded: undefined,
  };
});
</script>

<template>
  <div class="min-h-[100vh]">
    <div class="w-full min-h-full flex items-center flex-col">
      <HistoryModal v-model:form-name="formName" v-model:form-type="formType" />
      <OrderForm @add-order="addOrder" class="w-[350px]" />
      <!-- <CustomButton :class="'bg-red-500'">生成 PDF</CustomButton> -->
      <OrderTable class="w-[350px]" :order-list="orderList"></OrderTable>
      <TotalBlock :data="totalData" class="w-[350px]" />
    </div>
  </div>
</template>

<style scoped></style>
