import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import type { WordType } from "../types";

export function useFirestore() {
  const addItem = async (data: WordType) => {
    try {
      await addDoc(collection(db, "words"), data);
    } catch (error) {
      console.error("Помилка при додаванні:", error);
    }
  };

  const getItems = async () => {
    const snapshot = await getDocs(collection(db, "words"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WordType[];
  };

  return { addItem, getItems };
}
