<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  class?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <!-- class="" -->
  <button class="text-white font-bold py-2 px-4 rounded" :class="props.class">
    <slot />
  </button>
</template>
