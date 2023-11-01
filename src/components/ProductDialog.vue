<template>
<Dialog
  v-model:visible="modelValueVisible"
  :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  class="border-round-2xl"
  modal
  :pt="{ mask: { style: 'backdrop-filter: blur(2px)' } }"
  :style="{width: '480px', maxHeight: '96vh', overflowY: 'auto'}"
>
  <template #container>
    <article>
      <ProductComponent
        addable
        :product="product"
      >
        <template #buttons="{ amount }">
          <div class="flex justify-content-end mt-4 mb-2">
            <Button
              icon="pi pi-times"
              label="Cancel"
              plain
              text
              @click="modelValueVisible = false"
            />

            <Button
              class="ml-4"
              :disabled="!amount"
              icon="pi pi-plus"
              label="Add Products to Cart"
              severity="warning"
              @click="handleAddOrderToCart({product, amount})"
            />
          </div>
        </template>
      </ProductComponent>
    </article>
  </template>
</Dialog>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'

import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

import ProductComponent from './ProductComponent.vue'

import { useToast } from 'primevue/usetoast'
import { useStoreProducts } from '../composables'

import { Order, Product } from '../models'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: () => null
  },
  modelValue: Boolean
})

const emit = defineEmits(['update:model-value'])

const modelValueVisible = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:model-value', value)
  }
})

const toast = useToast()
const { ADD_ORDER } = useStoreProducts()

function handleAddOrderToCart (order: Order) {
  ADD_ORDER(order)
  toast.add({ severity: 'success', summary: 'success', detail: 'Product Added to Cart Successfully!', life: 3000 })
  modelValueVisible.value = false
}
</script>
