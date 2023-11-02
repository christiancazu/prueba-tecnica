<template>
<Card
  class="product-card border-round-2xl h-full overflow-hidden"
  :class="{ 'shadow-card': !addable }"
>
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
      <div>
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
            @update:active="($event) => { SET_VIEW_MORE({id: product.id, value: $event })}"
          >
            <template #display>
              <div
                v-tooltip.top="'View more'"
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
        <PriceComponent :price="product.price" />

        <AmountComponent
          v-if="addable"
          v-model="amount"
        />

        <Button
          v-else
          icon="pi pi-cart-plus"
          label="Add to Cart"
          severity="warning"
          @click="$emit('product:select')"
        />
      </div>
      <slot name="buttons" />
    </div>
  </template>
</Card>
</template>

<script setup lang="ts">
import { type PropType, inject, Ref } from 'vue'

import Card from 'primevue/card'
import Image from 'primevue/image'
import Button from 'primevue/button'
import Inplace from 'primevue/inplace'

import Rating from './Rating.vue'
import CategoryChip from './CategoryChip.vue'
import PriceComponent from './PriceComponent.vue'
import AmountComponent from './AmountComponent.vue'

import { useStoreProducts } from '../composables'

import { Product } from '../models'

defineProps({
  product: {
    type: Object as PropType<Product>,
    default: () => null
  },
  addable: Boolean
})

defineEmits(['product:select'])

const { SET_VIEW_MORE } = useStoreProducts()

const amount = inject('provide-amount') as Ref<number>
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

