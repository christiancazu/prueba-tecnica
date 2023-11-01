<template>
<div class="rating">
  <div
    v-tooltip.top="`Valoración: ${props.rating.rate.toString()}`"
    class="rating__starts"
  >
    <div
      class="rating__starts__fill-ratings"
      :style="{width: ratingStartsWidth}"
    >
      <span>★★★★★</span>
    </div>
    <div class="rating__starts__empty-ratings">
      <span>★★★★★</span>
    </div>
  </div>

  <div
    v-tooltip.top="`Votaciones: ${props.rating.count.toString()}`"
    class="rating__reviews"
  >
    <i class="pi pi-user" /><span>{{ props.rating.count }}</span>
  </div>
</div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Rating } from '../models'

const props = defineProps({
  rating: {
    type: Object as PropType<Rating>,
    default: () => null
  }
})

const ratingStartsWidth = computed(()=> (props.rating.rate / 5 * 100) + '%')
</script>

<style lang="scss">
.rating {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__starts {
    font-size: 24px;
    color: gray;
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-block;
    cursor: pointer;

    & span {
      &:hover {
        filter: brightness(0.7);
      }
    }

    &__fill-ratings {
      color: gold;
      padding: 0;
      position: absolute;
      z-index: 1;
      display: block;
      top: 0;
      left: 0;
      overflow: hidden;

      span {
        display: inline-block;
      }
    }

    &__empty-ratings {
      padding: 0;
      display: block;
      z-index: 0;
    }
  }

  &__reviews {
    display: flex;
    cursor: pointer;

    &:hover {
      filter: brightness(0.7);
    }

    & * {
      font-size: 16px;
    }

    & i {
      margin-right: 4px;
    }
  }
}
</style>
