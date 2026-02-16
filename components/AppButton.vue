<template>
  <component :is="isLink ? 'a' : 'button'" :href="props.to" :class="buttonClasses">
    <span class="btn__text">
      <slot />
    </span>

    <span class="btn__loader">
      {{ props.loadingText }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modifier?: 'primary' | 'secondary'
  loading?: boolean
  loadingText?: string
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  modifier: 'primary',
  loading: false,
  loadingText: 'Загрузка...',
})

const isLink = computed(() => !!props.to)
const buttonClasses = computed(() => [
  'btn',
  `btn--${props.modifier}`,
  {
    'btn--loading': props.loading,
  },
])
</script>
