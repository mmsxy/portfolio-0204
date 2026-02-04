
import { GoogleGenAI } from "@google/genai";
import { CHRISTINE_BIO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are Christine's Digital Assistant. Your goal is to represent Christine and answer questions about her career, skills, and portfolio projects. 
        
        Christine's Context:
        ${CHRISTINE_BIO}
        
        Available Projects:
        - Luminary: Brand Identity / Design Systems
        - Aether: UX/UI Design for Sleep Tracking
        - Flux: 3D WebGL Gallery
        - Oasis: Social Hub focused on privacy
        
        Keep responses concise, professional, yet creative and warm. If asked about something you don't know, suggest they contact Christine directly through the form below.`,
        temperature: 0.7,
        maxOutputTokens: 250,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please try again later.";
  }
};
