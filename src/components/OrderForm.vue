<script setup lang="ts">
import { ref } from "vue";
type InputFormat = {
  text: string;
  model: string;
  type: string;
};

const InputFormat: InputFormat[] = [
  { text: "輸入項目", model: "name", type: "text" },
  { text: "輸入規格", model: "criterion", type: "text" },
  { text: "輸入數量", model: "number", type: "number" },
  { text: "輸入單位", model: "unit", type: "text" },
  { text: "輸入單價", model: "price", type: "number" },
  { text: "輸入備註", model: "remark", type: "text" },
];

const itemTotal = ref(0);
</script>
<template>
  <div class="form-wrap mt-2">
    <form class="max-w-md mx-auto">
      <!-- <caption
          class="form-label px-2 d-flex justify-content-center align-items-center"
        >
          <b-icon icon="pencil-square" @click="titleFormShow = true" />
          <span style="padding-left: 10px"
            >{{ formTitle }}{{ formTypeString }}</span
          >
        </caption> -->
      <!-- 請款單or報價單 -->
      <div
        v-for="(formatItem, key) in InputFormat"
        :key="key"
        class="relative z-0 w-full mb-5 group"
      >
        <input
          :type="formatItem.type"
          :name="formatItem.model"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          :for="formatItem.model"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >{{ formatItem.text }}</label
        >
      </div>
      <p class="mt-2">小計 : {{ itemTotal }}</p>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        下一項
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        清空
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        刪除
      </button>
    </form>
  </div>
</template>