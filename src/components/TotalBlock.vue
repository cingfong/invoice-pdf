<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  data: {
    listTotal: number | undefined;
    listTax: number | undefined;
    listTaxIncluded: number | undefined;
  };
}

defineProps<Props>();
</script>
<template>
  <div>
    <div class="w-full flex justify-end">
      <div class="w-[180px]">
        <!-- <b-button v-if="editHistoryData" class="mb-0 mt-2" @click="cancelEdit">
      取消編輯
    </b-button> -->
        <p class="mb-0 mt-2"><span>合計 :</span> {{ data.listTotal }}</p>
        <p class="mb-0 mt-2"><span>稅金 : </span>{{ data.listTax }}</p>
        <p class="mb-0 mt-2"><span>總計 : </span>{{ data.listTaxIncluded }}</p>
      </div>
    </div>
  </div>
</template>
