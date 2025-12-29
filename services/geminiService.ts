
import { GoogleGenAI } from "@google/genai";
import { ClientData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getStrategicInsights = async (data: ClientData): Promise<string> => {
  try {
    const prompt = `
      Você é um consultor estratégico de viagens e milhas de elite. 
      Analise os dados abaixo do cliente e forneça 3 insights acionáveis, curtos e impactantes para maximizar a economia dele.
      
      Dados do Cliente:
      - Economia Atual: R$ ${data.realizedSavings}
      - Meta Anual: R$ ${data.annualTarget}
      - Total de Milhas: ${data.totalMiles}
      - Programas: ${data.milesPrograms.map(p => p.name).join(', ')}
      - Milhas a vencer em 30 dias: ${data.milesPrograms.reduce((acc, p) => acc + (p.expiring.find(e => e.days <= 30)?.amount || 0), 0)}
      
      Responda em formato Markdown, com tom profissional e executivo. Foco em lucro e eficiência.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Continue acumulando estrategicamente para atingir sua meta.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Otimize seus cartões de crédito para acelerar o acúmulo mensal.";
  }
};
