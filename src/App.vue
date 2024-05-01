<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "./components/atomic/CustomButton.vue";
import OrderTable from "./components/OrderTable.vue";

const orderList = ref([]);
</script>

<template>
  <CustomButton :class="'bg-red-500'">生成 PDF</CustomButton>
  <OrderTable :order-list="orderList"></OrderTable>
</template>

<style scoped></style>
