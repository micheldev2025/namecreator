import { useState } from 'react';
import { motion } from 'motion/react';

export default function DomainChecker() {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'available' | 'taken' | null>(null);
  const [loading, setLoading] = useState(false);

  const checkDomain = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    // Mocking domain check as real API requires key/setup
    setTimeout(() => {
      setStatus(Math.random() > 0.5 ? 'available' : 'taken');
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">Verificador de Domínio</h2>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="exemplo.com"
        className="px-6 py-3 rounded-xl border border-slate-300 w-full mb-4"
      />
      <button onClick={checkDomain} disabled={loading} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold">
        {loading ? 'Verificando...' : 'Verificar Disponibilidade'}
      </button>
      {status && (
        <p className={`mt-8 text-2xl font-bold ${status === 'available' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {status === 'available' ? 'Domínio disponível!' : 'Domínio já registrado.'}
        </p>
      )}
    </motion.div>
  );
}
