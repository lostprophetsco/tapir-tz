<template>
  <button :class="buttonClasses" @click="$emit('click')">
    <span class="btn__text">
      <slot />
    </span>

    <span class="btn__loader">
      {{ props.loadingText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modifier?: 'primary' | 'secondary'
  loading?: boolean
  loadingText?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  loadingText: 'Загрузка',
})

const emit = defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.modifier}`,
  {
    'btn--loading': props.loading,
  },
])
</script>
