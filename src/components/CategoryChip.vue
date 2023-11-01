<template>
<Chip
  class="product-card__category"
  :label="props.category"
  :style="{backgroundColor: categoryBg}"
/>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip'

const props = defineProps({
  category: {
    type: String,
    default: ''
  }
})

let categoryBg = 'gray'

switch (props.category) {
  case 'men\'s clothing':
    categoryBg = 'steelblue'
    break

  case 'jewelery':
    categoryBg = 'darkcyan'
    break


  case 'electronics':
    categoryBg = 'chocolate'
    break

  case 'women\'s clothing':
    categoryBg = 'violet'
    break
}
</script>
