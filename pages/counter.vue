<template>
  <div class="py-4">
    Count: {{ count }}
    <div class="mt-2">
      <NButton
        @click="
          count++;
          // count2++;
        "
        >+</NButton
      >
      <NButton
        @click="
          count--;
        "
        >-</NButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '~/store/counter';
const store = useCounter();
const { value: count } = storeToRefs(store);
</script>
