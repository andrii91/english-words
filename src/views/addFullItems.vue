<script lang="ts" setup>
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref } from "vue";
// Завантаження JSON
import itemsFull from "./itemsFull.json";

const status = ref(false);

async function uploadVerbs() {
  const verbsCollection = collection(db, "Vocabulary");
  for (const verb of itemsFull) {
    await addDoc(verbsCollection, verb);
  }
  console.log("Дані завантажені у Firestore!");
  status.value = true;
}

</script>

<template>
  <button v-if="!status" @click="uploadVerbs">Upload</button>

  <div class="success" v-if="status">Success</div>
</template>