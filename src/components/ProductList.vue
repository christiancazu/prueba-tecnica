<template>
<div class="mt-4">
  <div
    v-if="filteredProducts.length"
    class="grid"
  >
    <article
      v-for="product in filteredProducts"
      :key="product.id"
      class="col-12 lg:col-4 p-4"
    >
      <ProductComponent
        :product="product"
        @product:select="handleProductSelect(product)"
      />
    </article>
  </div>

  <div
    v-else
    class="flex justify-content-center mt-4 w-full"
  >
    <h4 class="my-4 text-center text-400">
      Sorry, no products matched with "{{ searchText }}"
    </h4>
  </div>
</div>

<ProductDialog
  v-model="isDialogVisible"
  :product="productSelected"
  @product:add="handleProductAdd"
/>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'

import { useStoreProducts } from '../composables'
import ProductComponent from './ProductComponent.vue'
import ProductDialog from './ProductDialog.vue'

import { Order, Product } from '../models'

const { products, dispatch_getProducts } = useStoreProducts()

const props = defineProps({
  currentCategory: {
    type: String,
    default: ''
  },
  searchText: {
    type: String,
    default: ''
  }
})

const isDialogVisible = ref(false)
const productSelected = ref<Product>()
const provideAmount = ref(1)

const { ADD_ORDER } = useStoreProducts()

provide('provide-amount', provideAmount)

const filteredProducts = computed(() => products.value.filter(product => {
  const needle = props.searchText.toLowerCase()

  return product.title.toLowerCase().includes(needle)
}))

function handleProductSelect (product: Product) {
  provideAmount.value = 1
  productSelected.value = product
  isDialogVisible.value = true
}

function handleProductAdd (order: Order) {
  ADD_ORDER(order)
}

await dispatch_getProducts(props.currentCategory)
</script>
