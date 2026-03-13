import { useState } from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

export default function SloganGenerator() {
  const [keyword, setKeyword] = useState('');
  const [slogan, setSlogan] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSlogan = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie um slogan curto e criativo para uma empresa com a palavra-chave: ${keyword}`,
      });
      setSlogan(response.text || 'Não foi possível gerar o slogan.');
    } catch (error) {
      console.error(error);
      setSlogan('Erro ao gerar slogan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">Gerador de Slogan</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Ex: tecnologia, café, moda..."
        className="px-6 py-3 rounded-xl border border-slate-300 w-full mb-4"
      />
      <button onClick={generateSlogan} disabled={loading} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold">
        {loading ? 'Gerando...' : 'Gerar Slogan'}
      </button>
      {slogan && <p className="mt-8 text-2xl font-medium text-slate-800">"{slogan}"</p>}
    </motion.div>
  );
}
