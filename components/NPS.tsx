
import React, { useState } from 'react';
import { Send } from 'lucide-react';

const NPS: React.FC = () => {
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-12 mb-6 px-4 py-6 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl text-center animate-in fade-in zoom-in duration-500 border border-slate-200 dark:border-slate-800">
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">Obrigado pelo seu feedback!</p>
      </div>
    );
  }

  return (
    <div className="mt-16 mb-8 px-6 py-8 bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800/60 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Avaliação de Experiência</h4>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">De 0 a 10, qual a chance de indicar a Fly Per Points para um conhecido?</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
          {[...Array(11)].map((_, i) => (
            <button
              key={i}
              onClick={() => setScore(i)}
              className={`w-8 h-8 md:w-9 md:h-9 rounded-xl text-[10px] font-bold transition-all border ${
                score === i 
                ? 'bg-brand-red border-brand-red text-white glow-red scale-110' 
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-brand-red/50 hover:text-brand-red'
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <button 
          disabled={score === null}
          onClick={() => setSubmitted(true)}
          className="p-3 bg-brand-red text-white rounded-2xl glow-red disabled:opacity-30 disabled:grayscale transition-all active:scale-95 group"
          title="Enviar Avaliação"
        >
          <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default NPS;
