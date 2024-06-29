<script setup lang="ts">
import { ref, Ref, computed, defineEmits } from "vue";
import { type formData } from "../type/formData";

const emits = defineEmits<{ addOrder: [data: formData] }>();

type InputFormat = {
  text: string;
  model: keyof formData;
  type: string;
};

const editIndex: Ref<number | null> = ref(null);

const itemTotal = computed(() => {
  // 避免浮點數誤差
  return (
    ((data.value.price || 0) * 100 * (data.value.number || 0) * 100) / 10000
  );
});

const InputList: InputFormat[] = [
  { text: "輸入項目", model: "name", type: "text" },
  { text: "輸入規格", model: "spec", type: "text" },
  { text: "輸入數量", model: "number", type: "number" },
  { text: "輸入單位", model: "unit", type: "text" },
  { text: "輸入單價", model: "price", type: "number" },
  { text: "輸入備註", model: "remark", type: "text" },
];

const data: Ref<formData> = ref({
  name: "",
  spec: "",
  number: null,
  unit: "",
  price: null,
  itemTotal: null,
  remark: "",
});

function addFormList() {
  data.value.itemTotal = itemTotal.value;
  emits("addOrder", data.value);
}
</script>
<template>
  <div class="form-wrap mt-2">
    <div class="max-w-md mx-auto">
      <!-- 請款單or報價單 -->
      <div
        v-for="(formatItem, key) in InputList"
        :key="key"
        class="relative z-0 w-full mb-5 group"
      >
        <input
          :type="formatItem.type"
          :name="formatItem.model"
          v-model="data[formatItem.model]"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
        />
        <label
          :for="formatItem.model"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >{{ formatItem.text }}</label
        >
      </div>
      <p class="mt-2">小計 : {{ itemTotal }}</p>
      <div class="w-full flex justify-between py-4">
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="addFormList"
        >
          下一項
        </button>
        <button
          v-show="!editIndex"
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          清空
        </button>
        <button
          v-show="editIndex"
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          刪除
        </button>
      </div>
    </div>
  </div>
</template>
