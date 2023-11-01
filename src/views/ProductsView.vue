<template>
<Searchbar v-model="searchText" />

<Suspense @resolve="isRequestResolved = true">
  <CategoryList v-model="currentCategory" />

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
    <Suspense :key="currentCategory">
      <ProductList
        :current-category="currentCategory"
        :search-text="searchText"
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
  <Toast />
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ProgressSpinner from 'primevue/progressspinner'

import Searchbar from '../components/Searchbar.vue'
import CategoryList from '../components/CategoryList.vue'
import ProductList from '../components/ProductList.vue'
import Toast from 'primevue/toast'

const isRequestResolved = ref<boolean>(false)
const currentCategory = ref<string>('All')
const searchText = ref<string>('')
</script>
