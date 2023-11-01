<template>
<TabMenu
  v-model:activeIndex="activeTab"
  :model="categories"
>
  <template #item="{ label, item, props }">
    <RouterLink
      v-if="item.route"
      v-slot="routerProps"
      custom
      :to="item.route"
    >
      <a
        v-bind="props.action"
        class="border-noround border-none"
        :href="routerProps.href"
        @click="($event) => routerProps.navigate($event)"
      >
        <img
          :alt="item.icon"
          height="36"
          :src="`/images/${item.icon}.png`"
          width="36"
        >
        <span
          v-bind="props.label"
          class="ml-4 text-lg"
        >
          {{ label }}
        </span>
      </a>
    </RouterLink>
  </template>
</TabMenu>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStoreCategories } from '../composables'
import { Category } from '../models'

import TabMenu from 'primevue/tabmenu'

const router = useRouter()
const route = useRoute()
const { dispatch_getCategories } = useStoreCategories()

const activeTab = ref(0)
const categories = ref<Category[]>([])

const emit = defineEmits(['change-category'])

onMounted(() => setActiveTab())

watch(route, () => {
  setActiveTab()
  emit('change-category', getCurrentCategory()?.label || 'All')
})

function getCurrentCategory (): Category|undefined {
  activeTab.value = categories.value.findIndex((item) => route.path === router.resolve(item.route).path)
  return categories.value.find(item => route.path === router.resolve(item.route).path)
}

function setActiveTab () {
  activeTab.value = categories.value.findIndex((item) => route.path === router.resolve(item.route).path)
}

// request
const { data: categoryNames } = await dispatch_getCategories()

categories.value = categoryNames.map((category: string) => ({
  label: category,
  icon: category.replace('\'', '').replace(' ', '-'),
  route: '/products/' + category.replace('\'', '').replace(' ', '-')
}))

categories.value.push({
  label: 'All',
  icon: 'all',
  route: '/products'
})
</script>

<style>
.p-tabmenu .p-tabmenu-nav {
  border: none;
  display: flex;
  justify-content: center;
}
</style>
