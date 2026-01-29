import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const analyzeEstimate = async (items: any[]) => {
    if (!API_KEY) {
        throw new Error("Missing Gemini API Key. Check your .env file.");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const itemsList = items.map(i => `- ${i.name} (${i.quantity} ${i.unit}) - ${i.category}`).join('\n');

    const prompt = `
Jesteś doświadczonym kierownikiem budowy. Przeanalizuj poniższy kosztorys domu jednorodzinnego i znajdź brakujące elementy lub potencjalne błędy.
Formatuj odpowiedź używając Markdown (pogrubienia, listy). Bądź konkretny i pomocny.

Oto pozycje w kosztorysie:
${itemsList}

Twoja analiza (skup się na tym, czego brakuje do kompletności etapu, w którym są te pozycje):
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Przepraszam, wystąpił błąd podczas analizy. Sprawdź swój klucz API lub spróbuj ponownie.";
    }
};
