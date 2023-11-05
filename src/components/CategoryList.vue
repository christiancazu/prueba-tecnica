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
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import TabMenu from 'primevue/tabmenu'

import { useStoreCategories } from '../composables'
import { Category } from '../models'

const router = useRouter()
const route = useRoute()
const { dispatch_getCategories } = useStoreCategories()

const activeTab = ref(0)
const categories = ref<Category[]>([])

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:model-value'])

watch(route, () => {
  setActiveTab()
  emitCurrentCategory()
})

function getCurrentCategory (): Category|undefined {
  setActiveTab()
  return categories.value.find(item => route.path === router.resolve(item.route).path)
}

function setActiveTab () {
  activeTab.value = categories.value.findIndex((item) => route.path === router.resolve(item.route).path)
}

function emitCurrentCategory () {
  emit('update:model-value', getCurrentCategory()?.label || 'All')
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

emitCurrentCategory()
</script>

<style>
.p-tabmenu .p-tabmenu-nav {
  border: none;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 993px) {
  .p-tabmenu-nav.p-reset {
    flex-wrap: wrap;
  }
}
</style>
