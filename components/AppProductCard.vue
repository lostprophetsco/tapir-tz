<template>
  <a href="#" class="product" :aria-label="`Товар: ${productName}`">
    <div class="product__image-wrapper">
      <img :src="imageUrl" :alt="productName" class="product__image" />
    </div>

    <div class="product__content">
      <div class="product__price">
        <span class="product__price-current">{{ currentPrice }}</span>
        <span class="product__price-half">{{ halfPrice }}</span>
      </div>

      <div class="product__title">{{ productName }}</div>

      <button
        class="product__favorite"
        @click.prevent
        aria-label="Добавить в избранное"
        :aria-pressed="false"
      >
        <img src="~/assets/images/favorite.svg" alt="" role="presentation" />
      </button>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/types/api'
import { formatPrice, formatHalfPrice } from '~/utils/format'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const halfPrice = computed(() => formatHalfPrice(props.product.price))
const imageUrl = computed(() => props.product.image)
const productName = computed(() => props.product.name)
const currentPrice = computed(() => formatPrice(props.product.price))
</script>
