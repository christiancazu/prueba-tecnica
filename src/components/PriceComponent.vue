<template>
<Chip class="pl-0 pr-3 flex align-items-center">
  <span class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center font-bold text-800">$</span>
  <span class="ml-2 font-bold text-800 text-xl">{{ price }}</span>
</Chip>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip'

defineProps({
  price: {
    type: Number,
    default: 0
  }
})
</script>
