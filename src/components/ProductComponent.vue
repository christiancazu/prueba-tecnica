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
        <div
          v-if="addable"
          class="flex align-items-center"
        >
          <Button
            v-tooltip="'Decrement'"
            :disabled="!amount"
            icon="pi pi-minus"
            rounded
            severity="secondary"
            @click="amount--"
          />
          <h3 class="mx-3">
            {{ amount }}
          </h3>
          <Button
            v-tooltip="'Increment'"
            icon="pi pi-plus"
            rounded
            severity="secondary"
            @click="amount++"
          />
        </div>
        <Button
          v-else
          icon="pi pi-cart-plus"
          label="Add to Cart"
          severity="warning"
          @click="$emit('product:select')"
        />
      </div>
      <slot
        :amount="amount"
        name="buttons"
      />
    </div>
  </template>
</Card>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'

import Card from 'primevue/card'
import Image from 'primevue/image'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import Inplace from 'primevue/inplace'

import Rating from './Rating.vue'
import CategoryChip from './CategoryChip.vue'

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

const amount = ref(1)
</script>

