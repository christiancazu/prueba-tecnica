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
      <Card class="product-card border-round-2xl h-full overflow-hidden shadow-card">
        <template #header>
          <div class="product-card__header">
            <Image
              alt="user header"
              class="w-full"
              preview
              :src="product.image"
            />
            <CategoryChip
              :category="product.category"
              class="product-card__category"
            />
          </div>
        </template>
        <template #content>
          <div class="flex flex-column justify-content-between h-full">
            <div class="">
              <h3 class="mb-3 text-800">
                {{ product.title }}
              </h3>
              <Rating
                class="mb-3"
                :rating="product.rating"
              />

              <span class="text-400">
                <span v-if="!product.viewMore">
                  {{ product.description.substring(0, 54) }}&nbsp;
                </span>
                <Inplace
                  class="view-more"
                  @update:active="(event) => {product.viewMore = event}"
                >
                  <template #display>
                    <div
                      v-tooltip.top="'Ver más'"
                      class="text-900"
                    >
                      <span>&hellip;</span>
                    </div>
                  </template>
                  <template #content>
                    <p class="m-0">
                      {{ product.description }}
                    </p>
                  </template>
                </Inplace>
              </span>
            </div>
            <div class="flex justify-content-between align-items-center mt-4">
              <Chip class="pl-0 pr-3">
                <span class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center font-bold text-800">$</span>
                <span class="ml-2 font-bold text-800 text-xl">{{ product.price }}</span>
              </Chip>
              <Button
                icon="pi pi-cart-plus"
                label="Add to Cart"
                severity="warning"
              />
            </div>
          </div>
        </template>
      </Card>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Card from 'primevue/card'
import Image from 'primevue/image'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import Inplace from 'primevue/inplace'

import Rating from './Rating.vue'
import CategoryChip from './CategoryChip.vue'

import { useStoreProducts } from '../composables'

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

const filteredProducts = computed(() => products.value.filter(product => {
  const needle = props.searchText.toLowerCase()

  return product.title.toLowerCase().includes(needle)
}))

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
