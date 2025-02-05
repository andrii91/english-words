import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import type { WordType } from "../types";

export function useFirestore() {
  const addItem = async (data: WordType, _dbName:string = "words") => {
    try {
      await addDoc(collection(db, _dbName), data);
    } catch (error) {
      console.error("Помилка при додаванні:", error);
    }
  };

  const getItems = async (_dbName:string = "words") => {
    const snapshot = await getDocs(collection(db, _dbName));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WordType[];
  };

  return { addItem, getItems };
}
