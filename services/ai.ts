import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, ensure the key is present. 
// For this demo, we handle the missing key gracefully in the UI.
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getMarketInsights = async (tokens: {symbol: string, change: number}[]): Promise<string> => {
  if (!ai) {
    return "Connect your API Key to get real-time market insights powered by Gemini.";
  }

  try {
    const prompt = `
      You are a financial analyst for a crypto app called Leapa in Kenya.
      Analyze these 24h market trends:
      ${JSON.stringify(tokens)}
      
      Provide a 1-sentence witty or encouraging summary for a young user. 
      Keep it under 20 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Market looks interesting today!";
  } catch (error) {
    console.error("AI Error:", error);
    return "Unable to fetch insights at the moment.";
  }
};