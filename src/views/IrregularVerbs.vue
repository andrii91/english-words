<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from "vue";
import { useFirestoreCollections } from "../composables/useFirestoreCollections";
import { useSpeechSynthesis } from '../composables/useSpeechSynthesis';
import { useImageSearch } from "../composables/useImageSearch";
import Skeketon from "../components/Skeketon.vue";
import ImageLazy from "../components/ImageLazy.vue";

const { images, searchImages } = useImageSearch(); 
const { speak } = useSpeechSynthesis();
const { getItems } = useFirestoreCollections();

const items = ref([] as any[]);
const currentIndex = ref(0);
const loading = ref(true);
const startX = ref(0);

const fetchItems = async () => {
  items.value = await getItems("irregularVerbs");
  await nextTick();
  searchImages(items.value[currentIndex.value].infinitive);
  loading.value = false;
};

const isPrevDisabled = computed((): boolean => currentIndex.value === 0);
const isNextDisabled = computed((): boolean => currentIndex.value === (items.value.length - 1));

onMounted(fetchItems);

// Використовуємо watch для автоматичного оновлення зображень при зміні currentIndex
watch(currentIndex, (newIndex) => {
  if (items.value.length > 0 && items.value[newIndex]) {
    searchImages(items.value[newIndex].infinitive);
  }
});

const nextIndex = () => {
  if (currentIndex.value < items.value.length - 1) {
    currentIndex.value++;
  }
  return false;
};

const prevIndex = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  return false;
};

const onTouchStart = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX;
};

const onTouchEnd = (event: TouchEvent) => {
  const endXValue = event.changedTouches[0].clientX;
  const diffX = startX.value - endXValue;

  if (diffX > 50) {
    nextIndex();
  } else if (diffX < -50) {
    prevIndex();
  }
};
</script>


<template>
  <div>
    <div class="card" v-if="!loading"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="count">
        {{ currentIndex + 1 }} / {{ items.length }}
      </div>
      <ImageLazy v-if="images.length > 0" class="card-image" :src="images[0].src.medium" :alt="images[0].alt" />
      <ImageLazy v-else class="card-image" src="#" alt="Error" />
      <img v-if="images.length"  />
      <div class="card-word">
        {{ items[currentIndex].infinitive }} / {{ items[currentIndex].past_simple }} / {{ items[currentIndex].past_participle }} 
        <img class="card-transcription-on" @click="speak(`${items[currentIndex].infinitive} ${items[currentIndex].past_simple} ${items[currentIndex].past_participle}`)" src="../assets/analyze-sound-wave-icon.svg" alt="Vue logo" />
      </div>
     
      <div class="card-translation">
        {{ items[currentIndex].translation }}
      </div>

      <div class="card-buttons">
        <button :disabled="isPrevDisabled" @click="prevIndex"><svg class="icon"><use xlink:href="#arrow-left"></use></svg></button>
        <button :disabled="isNextDisabled" @click="nextIndex"><svg class="icon"><use xlink:href="#arrow-right"></use></svg></button>
      </div>

      <span @click="currentIndex = currentIndex + 10">go next 10</span>
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

    .icon {
      width: 16px;
      height: 16px;
    }
  }

  .count {
    text-align: right;
  }


  span {
    margin-top: auto;
    font-weight: 700;
    padding: 6px 2px;
    cursor: pointer;
  }
}
</style>