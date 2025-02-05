<template>
  <header class="header">
    <router-link :to="{ name: 'home' }">
      <img class="header-logo" src="./assets/logo.webp" alt="">
    </router-link>
  </header>
  <main>
    <div>
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 30px;

  &-logo {
    width: 120px;
  }
}
</style>
