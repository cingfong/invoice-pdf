<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
// import CustomButton from "./components/atomic/CustomButton.vue";
import OrderTable from "./components/OrderTable.vue";
import OrderForm from "./components/OrderForm.vue";
import HistoryModal from "./components/HistoryModal.vue";

interface formData {
  name: string | null;
  spec: string | null;
  number: number | null;
  unit: string | null;
  price: number | null;
  itemTotal: number | null;
  remark: string | null;
}
const orderList: Ref<Array<formData>> = ref([]);

function addOrder(data: formData): void {
  orderList.value.push(data);
}
</script>

<template>
  <div class="w-full flex items-center flex-col">
    <OrderForm @add-order="addOrder" class="w-[350px]" />
    <HistoryModal />
    <!-- <CustomButton :class="'bg-red-500'">生成 PDF</CustomButton> -->
    <OrderTable :order-list="orderList"></OrderTable>
  </div>
</template>

<style scoped></style>
