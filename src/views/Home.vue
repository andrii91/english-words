<script lang="ts" setup>
import { useFirestoreCollections } from "../composables/useFirestoreCollections";
import { ref, onMounted } from "vue";
import Skeketon from "../components/Skeketon.vue";

const { fetchCollections, collections } = useFirestoreCollections();
const loading = ref(true);

onMounted(async () => {
  await fetchCollections();
  loading.value = false;
});
</script>

<template>
  <div class="home">
    <ul  class="home-links">
      <li>
        <router-link :to="{ name: 'irregular' }" > Irregular Verbs </router-link>
      </li>
      <template v-if="!loading">
        <li v-for="col in collections" :key="col">
          <router-link :to="{ name: 'lesson', params: {lessonsId: col} }" > {{ decodeURIComponent(col) }} </router-link>
        </li>
      </template>
      <Skeketon v-else v-for="index in 4" :key="index" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.home {
  max-height: calc(100vh - 190px);
  overflow-y: auto;

  &-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      a {
        background: white;
        padding: 8px 16px;
        border-radius: 8px;
        display: block;
        color: black;

        &:hover {
          opacity: .7;
        }
      }
    }
  }

  .skeleton {
    height: 40px;
    border-radius: 8px;
  }
}
</style>