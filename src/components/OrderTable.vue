<script setup lang="ts">
import { defineProps,defineEmits } from "vue";
import { formData } from "../type/formData";
interface Props {
  orderList: formData[];
}

const props = withDefaults(defineProps<Props>(), {
  orderList: () => [
    {
      name: null,
      spec: null,
      number: null,
      unit: null,
      price: null,
      itemTotal: null,
      remark: null,
    },
  ],
});

const emit = defineEmits<{(event: "setEditOfIndex", index: number): void;}>();
</script>
<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-[750px] min-h-[150px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-2 py-3 text-lg min-w-[100px]">施工項目</th>
          <th scope="col" class="px-2 py-3 text-lg">規格</th>
          <th scope="col" class="px-2 py-3 text-lg">數量</th>
          <th scope="col" class="px-2 py-3 text-lg">單位</th>
          <th scope="col" class="px-2 py-3 text-lg">單價</th>
          <th scope="col" class="px-2 py-3 text-lg">小計</th>
          <th scope="col" class="px-2 py-3 text-lg">備註</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(fromItem, index) in props.orderList"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td
            v-for="(item, key) in fromItem"
            :key="`item_${key}_${index}`"
            class="p-3"
          >
            <div class="flex">
              <template v-if="key === 'name'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 translate-x-[-10px]"
                  @click="emit('setEditOfIndex',index)" 
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </template>
              <p class="text-base">{{ item }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
