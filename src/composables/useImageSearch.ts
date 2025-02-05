import { ref } from "vue";
import { createClient } from "pexels";

export const useImageSearch = () => {
  const query = ref(""); // Пошуковий запит
  const images = ref<any[]>([]); // Масив зображень
  const isLoading = ref(false); // Статус завантаження
  const errorMessage = ref(""); // Повідомлення про помилку

  const apiKey = import.meta.env.VITE_PEXELS_API_KEY; // Ваш ключ від Pexels
  const client = createClient(apiKey);

  const searchImages = async () => {
    if (!query.value.trim()) return;

    isLoading.value = true;
    errorMessage.value = "";

    try {
      const response = await client.photos.search({
        query: query.value,
        per_page: 1, // Кількість зображень на сторінку
      });

      // Перевірка, чи є в відповіді фотографії
      if ('photos' in response) {
        images.value = response.photos;
      } else {
        throw new Error("Невідома помилка");
      }
    } catch (error) {
      errorMessage.value = "Не вдалося знайти зображення";
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    query,
    images,
    isLoading,
    errorMessage,
    searchImages,
  };
};
