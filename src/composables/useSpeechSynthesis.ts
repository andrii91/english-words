export function useSpeechSynthesis() {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Перевірка, чи доступні голоси
      const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(voice => voice.lang === 'en-US') || voices[0];
        utterance.voice = selectedVoice;
        utterance.lang = 'en-US';  // Англійська мова
        utterance.rate = 1;  // Швидкість (від 0.1 до 10)
        utterance.pitch = 1; // Висота тону (від 0 до 2)
        utterance.volume = 1; // Гучність (від 0 до 1)
        window.speechSynthesis.speak(utterance);
      };

      // Якщо голоси не завантажені, слухаємо подію голосів
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = setVoice;
      } else {
        setVoice();  // Якщо голоси вже завантажені
      }
    } else {
      console.error("Speech Synthesis API не підтримується в цьому браузері");
    }
  };

  return { speak };
}
