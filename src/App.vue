<script setup lang="ts">
import { ref } from "vue";
// import CustomButton from "./components/atomic/CustomButton.vue";
import OrderTable from "./components/OrderTable.vue";
import OrderForm from "./components/OrderForm.vue";
import HistoryModal from "./components/HistoryModal.vue";

const orderList = ref([]);

function addOrder(data) {
  console.log(data);
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
