
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

// A simple check for the API key. In a real app, this might be handled more robustly.
if (!API_KEY) {
  // We can't throw an error here as it would stop the app from loading.
  // The UI will handle the case where the service is unavailable.
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const fallbackWords = ['house', 'star', 'boat', 'bridge', 'flower', 'pencil', 'river', 'cloud', 'shoe', 'door'];

const getRandomFallback = () => {
    return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
}

export const fetchSecretWord = async (): Promise<string> => {
  if (!API_KEY) {
    console.log("Using fallback word due to missing API key.");
    return getRandomFallback();
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a single, common, and simple noun for a social deduction game. The word should be easy for most people to describe. Examples: "apple", "chair", "moon", "key". Return only the single word in lowercase. Do not add any punctuation, explanation, or extra text.',
    });
    
    const word = response.text.trim().toLowerCase();
    
    if (word && !/\s/.test(word) && /^[a-z]+$/.test(word)) {
      return word;
    }
    
    console.warn("Gemini returned an invalid format, using fallback word.");
    return getRandomFallback();
  } catch (error) {
    console.error("Error fetching secret word from Gemini:", error);
    return getRandomFallback();
  }
};
