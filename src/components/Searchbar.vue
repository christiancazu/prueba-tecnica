<template>
<Toolbar>
  <template #start>
    <img
      alt="fakestoreapi"
      height="32"
      src="https://fakestoreapi.com/icons/logo.png"
    >
    <h3 class="ml-2">
      fakestoreapi
    </h3>
  </template>

  <template #center>
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        placeholder="Search product"
        :value="props.modelValue"
        @input="handleEmitValue"
      />
    </span>
    <span
      v-if="props.modelValue"
      class="p-input-icon-right"
    >
      <i
        v-tooltip="'Clear Search'"
        class="pi pi-times-circle cursor-pointer"
        @click="handleClearInput"
      />
    </span>
  </template>

  <template #end>
    <Button
      :badge="myOrders.length ? myOrders.length.toString() : undefined"
      badge-class="badge-cart"
      :disabled="!myOrders.length"
      icon="pi pi-shopping-bag"
      label="My Products"
      @click="$router.push('/my-order')"
    />
  </template>
</Toolbar>
</template>

<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useStoreProducts } from '../composables'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:model-value'])

const { myOrders } = useStoreProducts()

function handleEmitValue (event: Event) {
  emit('update:model-value', (event.target as HTMLInputElement).value)
}

function handleClearInput () {
  emit('update:model-value', '')
}
</script>

<style>
.badge-cart {
  min-width: 1.2rem;
  height: 1.2rem;
  line-height: 1.2rem;
}

@media screen and (max-width: 993px) {
  .p-toolbar-group-center {
    width: 100%;

    & span {
      width: 100%;

      & input {
        width: 100%;
        margin-bottom: 8px;
      }
    }

  }

}
</style>


