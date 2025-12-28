
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzePhishing = async (urlOrContent: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following for phishing threats: "${urlOrContent}". Determine if it is malicious, suspicious, or safe. Provide a risk score (0-100), key red flags, and an explanation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          status: { type: Type.STRING },
          flags: { type: Type.ARRAY, items: { type: Type.STRING } },
          explanation: { type: Type.STRING },
          recommendation: { type: Type.STRING }
        },
        required: ["score", "status", "flags", "explanation", "recommendation"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const analyzePasswordStrength = async (password: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this password: "${password}". Evaluate its complexity, patterns, and estimated time to crack. Suggest 3 stronger variations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          complexityScore: { type: Type.NUMBER, description: "1-10 scale" },
          vulnerabilities: { type: Type.ARRAY, items: { type: Type.STRING } },
          timeToCrack: { type: Type.STRING },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["complexityScore", "vulnerabilities", "timeToCrack", "suggestions"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generatePrivacyScore = async (appName: string, permissions: string[]) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `App: ${appName}. Requested Permissions: ${permissions.join(", ")}. Assess the privacy risk.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          privacyScore: { type: Type.NUMBER, description: "0-100 where 100 is best" },
          riskLevel: { type: Type.STRING },
          suspiciousPermissions: { type: Type.ARRAY, items: { type: Type.STRING } },
          dataSharingPrediction: { type: Type.STRING },
          verdict: { type: Type.STRING }
        },
        required: ["privacyScore", "riskLevel", "suspiciousPermissions", "dataSharingPrediction", "verdict"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const analyzeSpamCall = async (callerId: string, transcript: string = "") => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Caller ID: ${callerId}. Transcript (if any): ${transcript}. Is this a spam or scam call? Use common spam patterns and caller ID heuristics.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isSpam: { type: Type.BOOLEAN },
          confidence: { type: Type.NUMBER },
          scamType: { type: Type.STRING },
          redFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
          actionRecommended: { type: Type.STRING }
        },
        required: ["isSpam", "confidence", "scamType", "redFlags", "actionRecommended"]
      }
    }
  });
  return JSON.parse(response.text);
};
