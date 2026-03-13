/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, RefreshCw, Wand2, Info, ArrowDownToLine, Menu, X } from 'lucide-react';
import SloganGenerator from './components/SloganGenerator';
import DomainChecker from './components/DomainChecker';

const prefixes = ['Neo', 'Nova', 'Zen', 'Sky', 'Tech', 'Blue', 'Purple', 'Swift', 'Prime', 'Apex'];
const suffixes = ['ify', 'io', 'ly', 'hub', 'labs', 'core', 'flow', 'base', 'sync', 'grid'];

function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 py-16"
    >
      <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Info className="w-8 h-8 text-purple-600" />
        Sobre o NameCreator
      </h2>
      <p className="text-slate-600 leading-relaxed">
        O NameCreator é uma ferramenta inteligente projetada para ajudar empreendedores, 
        startups e criativos a encontrarem o nome perfeito para seus projetos. 
        Utilizando algoritmos de combinação de palavras, geramos sugestões modernas, 
        memoráveis e únicas baseadas em uma palavra-chave de sua escolha. 
        Nosso objetivo é simplificar o processo de branding, permitindo que você foque 
        no que realmente importa: construir seu negócio.
      </p>
    </motion.div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  const [text, setText] = useState("");
  const fullText = "Dê vida ao seu negócio.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6"
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-5xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8"
      >
        {text.split("negócio")[0]}
        {text.includes("negócio") && <span className="text-indigo-600">negócio</span>}
        {text.includes("negócio") ? text.split("negócio")[1] : ""}
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl"
      >
        O NameCreator transforma palavras simples em marcas memoráveis. Comece agora e encontre o nome perfeito.
      </motion.p>
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        onClick={onStart}
        className="px-10 py-4 bg-slate-900 text-white rounded-full text-lg font-semibold hover:bg-indigo-600 transition-all transform hover:scale-105"
      >
        Começar agora
      </motion.button>
    </motion.div>
  );
}

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<'landing' | 'home' | 'about' | 'slogan' | 'domain'>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const generateNames = () => {
    if (!keyword.trim()) return;
    setLoading(true);
    
    setTimeout(() => {
      const newNames: string[] = [];
      for (let i = 0; i < 8; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const randomCase = Math.random() > 0.5;
        const name = randomCase 
          ? `${prefix}${keyword}${suffix}`.toLowerCase()
          : `${keyword}${suffix}`.charAt(0).toUpperCase() + `${keyword}${suffix}`.slice(1);
        newNames.push(name);
      }
      setNames(newNames);
      setLoading(false);
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Nome "${text}" copiado!`);
  };

  const downloadNames = () => {
    const element = document.createElement("a");
    const file = new Blob([names.join('\n')], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "nomes_gerados.txt";
    document.body.appendChild(element);
    element.click();
  };

  const navLinks = (
    <>
      <button onClick={() => { setCurrentPage('landing'); setIsMenuOpen(false); }} className="hover:text-indigo-600">Home</button>
      <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="hover:text-indigo-600">Nomes</button>
      <button onClick={() => { setCurrentPage('slogan'); setIsMenuOpen(false); }} className="hover:text-indigo-600">Slogan</button>
      <button onClick={() => { setCurrentPage('domain'); setIsMenuOpen(false); }} className="hover:text-indigo-600">Domínio</button>
      <button onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }} className="hover:text-indigo-600">Sobre</button>
    </>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <header className="border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => { setKeyword(''); setNames([]); setLoading(false); setCurrentPage('landing'); setIsMenuOpen(false); }} className="text-2xl font-bold flex items-center gap-2">
            <Wand2 className="w-8 h-8 text-indigo-600" />
            <span className="text-slate-900">Name</span><span className="text-indigo-600">Creator</span>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            {navLinks}
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col gap-4 p-6 text-sm font-medium text-slate-600">
                {navLinks}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex-grow">
        {currentPage === 'landing' ? (
          <LandingPage onStart={() => setCurrentPage('home')} />
        ) : currentPage === 'home' ? (
          <main className="max-w-4xl mx-auto px-6 py-16 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
            >
              Gerador de Nomes para Empresas
            </motion.h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10">
              Digite uma palavra e gere nomes criativos para sua empresa ou projeto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ex: tech, food, design..."
                className="px-6 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-80"
              />
              <button
                onClick={generateNames}
                disabled={loading}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                {loading ? 'Gerando...' : 'Gerar Nomes'}
              </button>
            </div>

            <AnimatePresence>
              {names.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {names.map((name, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-indigo-300 transition"
                    >
                      <span className="font-mono text-indigo-900">{name}</span>
                      <button onClick={() => copyToClipboard(name)} className="text-slate-400 hover:text-indigo-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {names.length > 0 && (
              <>
                <button
                  onClick={generateNames}
                  className="mt-10 px-6 py-2 border border-slate-300 rounded-full text-sm font-medium text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  Gerar novos nomes
                </button>
                <button
                  onClick={downloadNames}
                  className="mt-4 px-6 py-2 border border-slate-300 rounded-full text-sm font-medium text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition flex items-center gap-2 mx-auto"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  Baixar lista
                </button>
              </>
            )}
          </main>
        ) : currentPage === 'slogan' ? (
          <SloganGenerator />
        ) : currentPage === 'domain' ? (
          <DomainChecker />
        ) : (
          <AboutPage />
        )}
      </div>

      <footer className="py-8 text-center border-t border-slate-100">
        <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} NameCreator. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
