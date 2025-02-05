<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { useFirestoreCollections } from "../composables/useFirestoreCollections";
import { useSpeechSynthesis } from '../composables/useSpeechSynthesis';
import { useImageSearch } from "../composables/useImageSearch";
import type { WordType } from "../types";
import { useRoute } from "vue-router";
import Skeketon from "../components/Skeketon.vue";
import ImageLazy from "../components/ImageLazy.vue";

const { images, searchImages } = useImageSearch(); 
const { speak } = useSpeechSynthesis();
const { getItems } = useFirestoreCollections();
const route = useRoute();

const dbName  = ref(route.params.lessonsId);
const items = ref([] as WordType[]);
const currentIndex = ref(0);
const loading = ref(true);

const fetchItems = async () => {
  items.value = await getItems(dbName.value as string);
  await nextTick();
  await searchImages(items.value[currentIndex.value].word);
  loading.value = false;
};

const isPrevDisabled = computed(():boolean => {
  return currentIndex.value === 0;
})

const isNextDisabled = computed(():boolean => {
  return currentIndex.value == (items.value.length - 1);
})

onMounted(fetchItems);

const nextIndex = () => {
  if((items.value.length - 1) > currentIndex.value) {
    currentIndex.value++;
    searchImages(items.value[currentIndex.value].word);
  }

  return false;
}

const prevIndex = () => {
  if(currentIndex.value > 0) {
    currentIndex.value--;
    searchImages(items.value[currentIndex.value].word);
  }

  return false;
}


</script>

<template>
  <div>
    <div class="card" v-if="!loading">
      <ImageLazy v-if="images.length > 0" class="card-image" :src="images[0].src.medium" :alt="images[0].alt" />
      <ImageLazy v-else class="card-image" src="#" alt="Error" />
      <img v-if="images.length"  />
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

      <div class="card-buttons">
        <button :disabled="isPrevDisabled" @click="prevIndex"><</button>
        <button :disabled="isNextDisabled" @click="nextIndex">></button>
      </div>
      
    </div>
  
    <Skeketon v-else class="card" />
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
  min-height: 427px;

  &-image {
    height: 160px;
    width: 100%;
    
    :deep(img) {
      height: 160px;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
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

  &-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      font-size: 24px;
    }
  }
}
</style>