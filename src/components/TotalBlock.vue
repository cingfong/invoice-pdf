<script setup lang="ts">
import { defineProps } from "vue";
import { type totalData } from "../type/formData";
interface Props {
  data: totalData;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    listTotal: undefined,
    listTax: undefined,
    listTaxIncluded: undefined,
  }),
});
</script>
<template>
  <div>
    <div class="w-full flex justify-end">
      <div class="min-w-[180px]">
        <!-- <b-button v-if="editHistoryData" class="mb-0 mt-2" @click="cancelEdit">
      取消編輯
    </b-button> -->
        <p class="mb-0 mt-2"><span>合計 :</span> {{ props.data.listTotal }}</p>
        <p class="mb-0 mt-2"><span>稅金 : </span>{{ props.data.listTax }}</p>
        <p class="mb-0 mt-2"><span>總計 : </span>{{ props.data.listTaxIncluded }}</p>
      </div>
    </div>
  </div>
</template>
