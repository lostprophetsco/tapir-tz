<template>
  <div class="main">
    <AppHeader />

    <main class="main__content">
      <div class="container main__container">
        <h1>Главная страница</h1>

        <AppButton to="/catalog">В каталог</AppButton>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppButton from '~/components/AppButton.vue'
</script>
