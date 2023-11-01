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
/>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useStoreProducts } from '../composables'
import ProductComponent from './ProductComponent.vue'
import ProductDialog from './ProductDialog.vue'

import { Product } from '../models'

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

const filteredProducts = computed(() => products.value.filter(product => {
  const needle = props.searchText.toLowerCase()

  return product.title.toLowerCase().includes(needle)
}))

function handleProductSelect (product: Product) {
  productSelected.value = product
  isDialogVisible.value = true
}

await dispatch_getProducts(props.currentCategory)
</script>

<style lang="scss">
.product-card {
  &__header {
    position: relative;

    & img {
      overflow: hidden !important;
      width: 100%;
      height: 360px;
      object-fit: cover;
    }

    & .product-card__category {
      position: absolute;
      bottom: 12px;
      right: 8px;
    }
  }

  &.p-card {
    display: flex;
    flex-direction: column;

    & .p-card-body {
      flex: 1;

      & .p-card-content {
        height: 100%;
        padding: 0;
      }
    }
  }

  & .view-more {
    display: inline-table;

    &.p-inplace .p-inplace-display {
      padding: 0;
    }
  }
}

.shadow-card {
  transition: box-shadow 0.5s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 1px 10px rgba(255, 255, 255, 0.38), 0px 4px 5px rgba(255, 255, 255, 0.36), 0px 2px 4px -1px rgba(255, 255, 255, 0.3);
  }
}
</style>
