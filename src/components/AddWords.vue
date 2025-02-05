<script setup lang="ts">
import { ref } from "vue";
import { useFirestore } from "../composables/useFirestore";
import type { WordType } from "../types"

const { addItem } = useFirestore();
const item = ref({} as WordType);

const addNewItem = async () => {
  // Створіть об'єкт з полями, які ви хочете додати до бази даних
  const newItem = {
    word: item.value.word,
    transcription: item.value.transcription,
    translation: item.value.translation
  };

  await addItem(newItem as WordType);  // Передайте об'єкт, а не масив

  item.value = {} as WordType;
};

</script>

<template>
  <div>
    <input type="text" v-model="item.word" placeholder="Англійське слово">
    <input type="text" v-model="item.transcription" placeholder="транскрипція">
    <input type="text" v-model="item.translation" placeholder="переклад">
    <button @click="addNewItem">Додати елемент</button>
  </div>
</template>
