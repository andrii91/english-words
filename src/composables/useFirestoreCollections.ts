import { db } from "../../firebase";
import { collection, getDoc, setDoc, updateDoc, doc, addDoc, getDocs } from "firebase/firestore";
import { ref } from "vue";
import type { WordType } from "../types/Word.types";

const metadataCollection = "metadata"; // Колекція для мета-даних
const collectionsDoc = "collections";  // Документ зі списком колекцій

const collections = ref<string[]>([]);

// 🔹 Отримати список колекцій з Firestore
const fetchCollections = async () => {
  try {
    const docRef = doc(db, metadataCollection, collectionsDoc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      collections.value = Object.keys(docSnap.data());
    } else {
      console.log("Документ collections ще не створено.");
    }
  } catch (error) {
    console.error("Помилка отримання списку колекцій:", error);
  }
};

// 🔹 Додати нову колекцію в документ `collections`
const addCollection = async (name: string) => {
  try {
    const docRef = doc(db, metadataCollection, collectionsDoc);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Якщо документа немає, створюємо його
      await setDoc(docRef, { [name]: true });
    } else if (!docSnap.data()?.[name]) {
      // Якщо документ є, але колекція не записана, оновлюємо його
      await updateDoc(docRef, { [name]: true });
    }

    collections.value.push(name);
  } catch (error) {
    console.error("Помилка додавання колекції:", error);
  }
};

// 🔹 Додати запис у Firestore (з перевіркою колекції)
const addItem = async (data: any, _dbName: string = "words") => {
  try {
    await fetchCollections();
    await addCollection(_dbName);
    await addDoc(collection(db, _dbName), data);
    console.log(`✅ Додано запис у колекцію: ${_dbName}`);
  } catch (error) {
    console.error("❌ Помилка при додаванні документа:", error);
  }
};

const getItems = async (_dbName:string = "words") => {
  const snapshot = await getDocs(collection(db, _dbName));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WordType[];
};

export function useFirestoreCollections() {
  return { collections, fetchCollections, addCollection, addItem, getItems };
}