<template>
<TheToolbar />

<Suspense @resolve="isRequestResolved = true">
  <CategoryList @change-category="currentCategory = $event" />

  <template #fallback>
    <div class="flex flex-column mt-4">
      <ProgressSpinner style="width: 50px; height: 50px" />
      <h4 class="flex justify-content-center my-2">
        Loading categories...
      </h4>
    </div>
  </template>
</Suspense>

<div
  v-if="isRequestResolved"
  class="flex justify-content-center"
>
  <div class="w-9">
    <!-- <ProductList :products="products" /> -->
    <Suspense :key="currentCategory">
      <ProductList
        :current-category="currentCategory"
      />
      <template #fallback>
        <div class="flex flex-column mt-4">
          <ProgressSpinner style="width: 50px; height: 50px" />
          <h4 class="flex justify-content-center my-2">
            Loading products...
          </h4>
        </div>
      </template>
    </Suspense>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductList from '../components/ProductList.vue'
import TheToolbar from '../components/TheToolbar.vue'
import ProgressSpinner from 'primevue/progressspinner'

import CategoryList from '../components/CategoryList.vue'

const isRequestResolved = ref<boolean>(false)
const currentCategory = ref<string>('')
</script>
