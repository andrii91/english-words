<template>
  <svg width="0" height="0" class="hidden">
    <symbol id="arrow-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5303 21.5303C15.2374 21.8232 14.7626 21.8232 14.4697 21.5303L5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L14.4697 2.46967C14.7626 2.17678 15.2374 2.17678 15.5303 2.46967C15.8232 2.76256 15.8232 3.23744 15.5303 3.53033L7.06066 12L15.5303 20.4697C15.8232 20.7626 15.8232 21.2374 15.5303 21.5303Z" fill="currentColor"/>
    </symbol>
    <symbol id="arrow-right" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.46967 21.5303C8.76256 21.8232 9.23744 21.8232 9.53033 21.5303L18.5303 12.5303C18.8232 12.2374 18.8232 11.7626 18.5303 11.4697L9.53033 2.46967C9.23744 2.17678 8.76256 2.17678 8.46967 2.46967C8.17678 2.76256 8.17678 3.23744 8.46967 3.53033L16.9393 12L8.46967 20.4697C8.17678 20.7626 8.17678 21.2374 8.46967 21.5303Z" fill="currentColor"/>
    </symbol>
  </svg>
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

.hidden {
  display: none;
}
</style>
