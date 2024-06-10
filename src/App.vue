<script setup lang="ts">
import { ref, computed, Ref } from "vue";
// import CustomButton from "./components/atomic/CustomButton.vue";
import OrderTable from "./components/OrderTable.vue";
import OrderForm from "./components/OrderForm.vue";
import HistoryModal from "./components/HistoryModal.vue";
import TotalBlock from "./components/TotalBlock.vue";
import { formData } from "./composables/formData";

const orderList: Ref<formData[]> = ref([]);
const formName = ref("");

function addOrder(data: formData): void {
  orderList.value.push(data);
}

// 總計計算
const totalData = computed(() => {
  const data = {
    listTotal: undefined,
    listTax: undefined,
    listTaxIncluded: undefined,
  };
  return data;
});
</script>

<template>
  <div class="min-h-[100vh]">
    <div class="w-full min-h-full flex items-center flex-col">
      <HistoryModal v-model:form-name="formName" />
      <OrderForm @add-order="addOrder" class="w-[350px]" />
      <!-- <CustomButton :class="'bg-red-500'">生成 PDF</CustomButton> -->
      <OrderTable class="w-[350px]" :order-list="orderList"></OrderTable>
      <TotalBlock :data="totalData" class="w-[350px]" />
    </div>
  </div>
</template>

<style scoped></style>
