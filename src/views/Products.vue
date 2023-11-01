<template>
<div class="flex justify-content-center">
  <div class="w-9">
    <ProductList :products="products" />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductList from '../components/ProductList.vue'
import { Product } from '../models'
import { axiosInstance } from '../config'

const products = ref<Product[]>()

axiosInstance.get('/products').then(({ data }) => products.value = data)
</script>
