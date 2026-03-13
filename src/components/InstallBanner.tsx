import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X } from 'lucide-react';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg z-50 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Download className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Instalar NameCreator</h3>
          <p className="text-xs text-slate-500">Adicione à tela inicial para acesso rápido.</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setIsVisible(false)} className="p-2 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
        <button onClick={handleInstall} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
          Instalar
        </button>
      </div>
    </motion.div>
  );
}
