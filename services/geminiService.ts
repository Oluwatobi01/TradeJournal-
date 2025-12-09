import { GoogleGenAI, Type } from "@google/genai";
import { Trade, AiInsight } from "../types";

const SYSTEM_INSTRUCTION = `
You are the AI Trading Journal Assistant inside a mobile trading-journal app designed for Gen Z forex, crypto, and stock traders.
Your role:
- Analyze the user’s logged trades.
- Identify patterns in their wins, losses, risk behavior, timing, and emotional triggers.
- Provide friendly, concise, Gen-Z-tone insights without giving financial advice.
- Help users reflect on their trade discipline, psychology, and consistency.

Tone: Motivational, friendly, short, slight use of Gen-Z slang (e.g., "locked in", "fumbled", "gains"), but professional enough to be taken seriously.

Do NOT provide financial advice. Focus on behavior and psychology.
`;

export const analyzeTrades = async (trades: Trade[]): Promise<AiInsight> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Analyze these recent trades:
      ${JSON.stringify(trades)}

      Provide a JSON response with the following fields:
      - summary: A short conversational summary of performance.
      - pattern: One key pattern identified (good or bad).
      - emotionalInsight: Insight connecting mood to outcome.
      - coachingTip: A short actionable tip.
      - performanceHighlight: A one-sentence shareable hype text.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            pattern: { type: Type.STRING },
            emotionalInsight: { type: Type.STRING },
            coachingTip: { type: Type.STRING },
            performanceHighlight: { type: Type.STRING },
          },
          required: ["summary", "pattern", "emotionalInsight", "coachingTip", "performanceHighlight"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AiInsight;

  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      summary: "Couldn't analyze trades right now.",
      pattern: "N/A",
      emotionalInsight: "Keep logging to get insights.",
      coachingTip: "Stay disciplined.",
      performanceHighlight: "Keep grinding.",
    };
  }
};