<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFirestore } from "../composables/useFirestore";
import { useSpeechSynthesis } from '../composables/useSpeechSynthesis';
import { useImageSearch } from "../composables/useImageSearch";
import type { WordType } from "../types";

const { query, images, searchImages } = useImageSearch();
const { speak } = useSpeechSynthesis();
const { getItems } = useFirestore();

const items = ref([] as WordType[]);
const currentIndex = ref(0);
const loading = ref(true);

const fetchItems = async () => {
  items.value = await getItems();
  query.value = items.value[currentIndex.value].word;
  searchImages();
  loading.value = false;
};

onMounted(fetchItems);

const nextIndex = () => {
  if((items.value.length - 1) > currentIndex.value) {
    currentIndex.value++;
    query.value = items.value[currentIndex.value].word;
    searchImages();
  }

  return false;
}
</script>

<template>
  <div class="card" v-if="!loading">
    <img v-if="images.length" class="card-image" :src="images[0].src.medium" :alt="images[0].alt" />
    <div class="card-word">
      {{ items[currentIndex].word }}
      <img class="card-transcription-on" @click="speak(items[currentIndex].word)" src="../assets/analyze-sound-wave-icon.svg" alt="Vue logo" />
    </div>
    <div class="card-transcription">
      {{ items[currentIndex].transcription }}
    </div>
    <div class="card-translation">
      {{ items[currentIndex].translation }}
    </div>

    
    <button @click="nextIndex">Next</button>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: silver;
  border-radius: 8px;
  padding: 32px 16px;
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 260px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  &-image {
    height: 160px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &-transcription {
    &-on {
      height: 52px;
      width: 52px;
      cursor: pointer;
      display: block;
      margin: auto;
    }
  }

  &-word {
    font-size: 24px;
    font-weight: bold;
  }

  button {
    margin-top: 40px;
  }
}
</style>