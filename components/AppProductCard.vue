<template>
  <a href="#" class="product">
    <div class="product__image-wrapper">
      <img :src="imageUrl" :alt="productName" class="product__image" />
    </div>

    <div class="product__content">
      <div class="product__price">
        <span class="product__price-current">{{ currentPrice }} ₽</span>
        <span class="product__price-half">{{ halfPrice }} ₽ x 2</span>
      </div>

      <div class="product__title">{{ productName }}</div>

      <button class="product__favorite" @click.prevent>
        <img src="~/assets/images/favorite.svg" alt="Добавить в избранное" />
      </button>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/types/api'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const halfPrice = computed(() => Math.ceil(props.product.price / 2))
const imageUrl = computed(() => props.product.image)
const productName = computed(() => props.product.name)
const currentPrice = computed(() => props.product.price)
</script>
