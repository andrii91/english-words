export function useSpeechSynthesis() {
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices.find(voice => voice.lang === 'en-US') || voices[0]; // Вибір голосу
      utterance.lang = 'en-US';  // Англійська мова
      utterance.rate = 1;  // Швидкість (від 0.1 до 10)
      utterance.pitch = 2; // Висота тону (від 0 до 2)
      utterance.volume = 1; // Гучність (від 0 до 1)
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech Synthesis API не підтримується в цьому браузері");
    }
  };

  return { speak };
}
