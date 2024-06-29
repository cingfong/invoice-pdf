<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  listTotal: number | undefined;
  listTax: number | undefined;
  listTaxIncluded: number | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  listTotal: undefined,
  listTax: undefined,
  listTaxIncluded: undefined,
});
</script>
<template>
  <div>
    <div class="w-full flex justify-end">
      <div class="w-[180px]">
        <!-- <b-button v-if="editHistoryData" class="mb-0 mt-2" @click="cancelEdit">
      取消編輯
    </b-button> -->
        <p class="mb-0 mt-2"><span>合計 :</span> {{ props.listTotal }}</p>
        <p class="mb-0 mt-2"><span>稅金 : </span>{{ props.listTax }}</p>
        <p class="mb-0 mt-2"><span>總計 : </span>{{ props.listTaxIncluded }}</p>
      </div>
    </div>
  </div>
</template>
