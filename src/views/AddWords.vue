<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFirestoreCollections } from "../composables/useFirestoreCollections";

const { addItem, fetchCollections, collections } = useFirestoreCollections();

const lesson = ref('words');
const isNewGroup = ref(false);

onMounted(async () => {
  await fetchCollections();
});

const newItem = ref({
  word: "",
  transcription: "",
  translation: ""
});

const addNewItem = async () => {
  await addItem(newItem.value, encodeURIComponent(lesson.value.replace(/\./g, "/"))); // Додає у "dictionary"
  newItem.value = { word: "", transcription: "", translation: "" }; // Очищення форми
};

const addNewGroup = () => {
  isNewGroup.value = true;
}

</script>

<template>
  <div class="add-words">
    <div class="add-words-theme">
      <template v-if="!isNewGroup">
        <label for="select">Група слів:</label>
        <select id="select" class="add-words-input" v-model="lesson">
          <option v-for="col in collections" :key="col" :value="col"> {{ decodeURIComponent(col) }} </option>
        </select>
    
        <button @click="addNewGroup">Додати нову групу слів</button>
      </template>
      <template v-else >
        <label for="new-group">Назва групи слів:</label>
        <input id="new-group" class="add-words-input" type="text" v-model="lesson" placeholder="Нова група слів">
      </template>
    </div>
    

    <input class="add-words-input" type="text" v-model="newItem.word" placeholder="Англійське слово">
    <input class="add-words-input" type="text" v-model="newItem.transcription" placeholder="Транскрипція">
    <input class="add-words-input" type="text" v-model="newItem.translation" placeholder="Переклад">

    <button @click="addNewItem()" >Додати елемент</button>
  </div>
</template>

<style lang="scss" scoped>
.add-words {
  background: gray;
  padding: 32px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &-input {
    padding: 8px 16px;
  }

  &-theme {
    margin-bottom: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>