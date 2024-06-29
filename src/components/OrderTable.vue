<script setup lang="ts">
import { defineProps } from "vue";
import { formData } from "../type/formData";
defineProps<{
  // 陣列物件，類型帶調整
  orderList: formData[];
}>();
</script>
<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">施工項目</th>
          <th scope="col" class="px-6 py-3">規格</th>
          <th scope="col" class="px-6 py-3">數量</th>
          <th scope="col" class="px-6 py-3">單位</th>
          <th scope="col" class="px-6 py-3">單價</th>
          <th scope="col" class="px-6 py-3">小計</th>
          <th scope="col" class="px-6 py-3">備註</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(fromItem, index) in orderList"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td
            v-for="(item, key) in fromItem"
            :key="`item_${key}_${index}`"
            class="px-6 py-4"
          >
            <b-icon v-if="key === 'name'" icon="pencil-square" />
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
