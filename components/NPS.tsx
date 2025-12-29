
import React, { useState } from 'react';
import { Send, CheckCircle2, Star, MessageSquare } from 'lucide-react';

const NPS: React.FC = () => {
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-16 mb-8 px-8 py-10 bg-emerald-50 dark:bg-emerald-950/20 rounded-[2.5rem] border-2 border-emerald-100 dark:border-emerald-900/40 text-center animate-in zoom-in duration-500">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="text-xl font-black text-emerald-600 dark:text-emerald-400 mb-1">Feedback Recebido</h4>
          <p className="text-sm font-bold text-emerald-600/60 dark:text-emerald-400/60 uppercase tracking-widest">Agradecemos por nos ajudar a voar mais alto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 mb-12 px-8 py-10 bg-white dark:bg-slate-900/60 rounded-[2.5rem] border border-slate-200 dark:border-slate-800/80 shadow-sm relative overflow-hidden group">
      {/* Decoração sutil de fundo */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-slate-50 dark:bg-slate-800/20 rounded-full blur-3xl group-hover:bg-brand-red/5 transition-all duration-700"></div>
      
      <div className="flex flex-col gap-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left space-y-2">
            <div className="flex items-center justify-center lg:justify-start gap-3">
               <Star className="text-brand-red fill-brand-red" size={20} />
               <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">Sua Opinião Importa</h4>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm leading-relaxed">
              De 0 a 10, qual a chance de você indicar a <span className="text-brand-red font-bold">Fly Per Points</span> para um conhecido?
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-2">
              {[...Array(11)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setScore(i)}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-2xl text-[12px] font-black transition-all border-2 ${
                    score === i 
                    ? 'bg-brand-red border-brand-red text-white glow-red scale-110' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-brand-red/30 hover:text-brand-red'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between w-full px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">
              <span className="flex items-center gap-1.5">🙁 Pouco Provável</span>
              <span className="flex items-center gap-1.5">Extremamente Provável 😊</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <button 
              disabled={score === null}
              onClick={() => setSubmitted(true)}
              className="px-10 py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              ENVIAR <Send size={18} />
            </button>
          </div>
        </div>

        {/* Campo de Feedback Opcional - Aparece após selecionar uma nota */}
        {score !== null && (
          <div className="animate-in slide-in-from-top-4 duration-500 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
              <MessageSquare size={16} className="fill-emerald-500/10" />
              <span className="text-[10px] font-black uppercase tracking-widest">Feedback Adicional (Opcional)</span>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Quer deixar algum feedback?"
              className="w-full p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:border-emerald-500/30 focus:bg-white dark:focus:bg-slate-800 transition-all text-sm font-medium text-slate-700 dark:text-slate-200 min-h-[100px] resize-none"
            ></textarea>
            <div className="lg:hidden">
              <button 
                onClick={() => setSubmitted(true)}
                className="w-full py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3"
              >
                ENVIAR <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NPS;
