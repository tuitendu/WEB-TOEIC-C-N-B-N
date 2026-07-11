// Speech Synthesis (TTS) Manager for English pronunciation
class SpeechManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voice = null;
    this.voicesLoaded = false;
    
    // Web Speech API loads voices asynchronously
    if (this.synth) {
      this.synth.onvoiceschanged = () => {
        this.loadVoices();
      };
      this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length > 0) {
      // Find English voices, prioritizing US and GB natural voices
      const enVoices = voices.filter(v => v.lang.startsWith('en-'));
      
      // Try to get a high-quality Google voice if possible, or any standard US voice
      const preferred = enVoices.find(v => v.name.includes('Google') && v.lang === 'en-US') ||
                        enVoices.find(v => v.lang === 'en-US') ||
                        enVoices.find(v => v.lang === 'en-GB') ||
                        enVoices[0];
      
      if (preferred) {
        this.voice = preferred;
        this.voicesLoaded = true;
      }
    }
  }

  speak(text) {
    if (!this.synth) {
      console.warn("Speech Synthesis is not supported in this browser.");
      return;
    }

    // Cancel any current utterance to prevent queue build-up
    this.synth.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) {
      utterance.voice = this.voice;
    }
    
    // Set parameters
    utterance.rate = 0.9;  // Slightly slower for learners
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    // Errors handler
    utterance.onerror = (event) => {
      console.error("Speech Synthesis error:", event);
    };

    this.synth.speak(utterance);
  }
}

// Instantiate global speech manager
const Speech = new SpeechManager();
