import { ref, type Ref } from "vue";

interface ImageSearchResult {
  images: Ref<any[]>;
  isLoading: Ref<boolean>;
  errorMessage: Ref<string>;
  searchImages: (query: string) => Promise<void>;
}

export const useImageSearch = (): ImageSearchResult => {
  const images = ref<any[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const apiKey = import.meta.env.VITE_PEXELS_API_KEY || "";

  const searchImages = async (query: string) => {
    if (!query.trim()) return;

    isLoading.value = true;
    errorMessage.value = "";

    try {
      if (!apiKey) {
        throw new Error("🚨 API-ключ Pexels не знайдено.");
      }

      const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
          Authorization: apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP помилка! Статус: ${response.status}`);
      }

      const data = await response.json();
      images.value = Array.isArray(data.photos) ? data.photos : [];
    } catch (error) {
      errorMessage.value = "Не вдалося знайти зображення";
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    images,
    isLoading,
    errorMessage,
    searchImages,
  };
};
