<template>
<div class="flex align-items-center">
  <Button
    v-tooltip="'Decrement'"
    :disabled="!amount"
    icon="pi pi-minus"
    rounded
    severity="help"
    @click="amount--"
  />
  <h3 class="mx-3">
    {{ amount }}
  </h3>
  <Button
    v-tooltip="'Increment'"
    icon="pi pi-plus"
    rounded
    severity="help"
    @click="amount++"
  />
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Button from 'primevue/button'

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:model-value'])

const amount = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:model-value', value)
  }
})
</script>
