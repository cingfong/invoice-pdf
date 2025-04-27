<script lang="ts" setup>
const tableHeaders = [
  { id: "name", text: "施工項目" },
  { id: "criterion", text: "規格" },
  { id: "number", text: "數量" },
  { id: "unit", text: "單位" },
  { id: "price", text: "單價" },
  { id: "itemTotal", text: "小計" },
  { id: "remark", text: "備註" },
];

function getTableHeaderIcon(index) {
  const icons = [
    "i-heroicons-list-bullet",
    "i-heroicons-adjustments-vertical",
    "i-heroicons-calculator",
    "i-heroicons-scale",
    "i-heroicons-currency-dollar",
    "i-heroicons-calculator",
    "i-heroicons-document-text",
  ];
  return icons[index] || "i-heroicons-pencil";
}

function formEdit(index) {
  formEditIndex.value = index;
  const item = formList.value[index];
  Object.keys(formData).forEach((key) => {
    formData[key] = item[key];
  });
}
</script>
<template>
  <div
    class="grid grid-cols-7 bg-slate-100 p-3 font-semibold text-sm text-slate-700 border-b border-slate-300"
  >
    <div
      v-for="(header, index) in tableHeaders"
      :key="header.id"
      class="flex items-center gap-2"
    >
      <UIcon :name="getTableHeaderIcon(index)" class="w-4 h-4 text-blue-600" />
      {{ header.text }}
    </div>
  </div>

  <div class="max-h-[300px] overflow-y-auto">
    <div
      v-for="(formItem, index) in formList"
      :key="index"
      class="grid grid-cols-7 p-3 border-b border-slate-200 transition-all hover:bg-slate-50"
      :class="{
        'bg-blue-50 border-l-2 border-l-blue-500': formEditIndex === index,
      }"
    >
      <div
        v-for="(item, key) in formItem"
        :key="`item${key}`"
        class="text-sm flex items-center gap-2 text-slate-700"
        :class="{ 'font-semibold text-blue-600': key === 'itemTotal' }"
      >
        <button
          v-if="key === 'name'"
          class="bg-transparent border-none text-slate-500 cursor-pointer p-1 rounded-full transition-all hover:bg-slate-100 hover:text-slate-800 hover:rotate-12"
          @click="formEdit(index)"
        >
          <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
        </button>
        {{ item }}
      </div>
    </div>
  </div>
</template>
