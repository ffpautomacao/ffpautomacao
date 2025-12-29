
import React from 'react';
import { ClientData, CreditCard } from '../types';
import { CreditCard as CardIcon, Star, TrendingUp, Zap, Sparkles } from 'lucide-react';

interface CardsViewProps {
  data: ClientData;
}

const CardBrandIcon: React.FC<{ brand: string }> = ({ brand }) => {
  const brandStyles: Record<string, { bg: string, text: string, content: React.ReactNode }> = {
    visa: {
      bg: 'bg-blue-600 dark:bg-blue-700',
      text: 'text-white',
      content: <span className="font-black italic text-[14px]">VISA</span>
    },
    mastercard: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-900 dark:text-white',
      content: (
        <div className="relative flex items-center justify-center w-8 h-8">
          <div className="absolute left-1 w-5 h-5 bg-rose-500 rounded-full mix-blend-multiply opacity-80"></div>
          <div className="absolute right-1 w-5 h-5 bg-amber-500 rounded-full mix-blend-multiply opacity-80"></div>
        </div>
      )
    },
    amex: {
      bg: 'bg-cyan-600 dark:bg-cyan-700',
      text: 'text-white',
      content: <span className="font-black text-[10px] tracking-tight">AMEX</span>
    },
    elo: {
      bg: 'bg-slate-900',
      text: 'text-white',
      content: (
        <div className="flex items-center space-x-0.5">
          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
        </div>
      )
    }
  };

  const style = brandStyles[brand.toLowerCase()] || brandStyles.visa;

  return (
    <div className={`p-3 ${style.bg} ${style.text} border border-slate-200/20 rounded-2xl shadow-inner flex items-center justify-center w-12 h-12 overflow-hidden`}>
      {style.content}
    </div>
  );
};

const CardsView: React.FC<CardsViewProps> = ({ data }) => {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500 no-overflow-x">
      {/* Portfolio de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cards.map((card) => (
          <div key={card.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl group relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-red/5 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <CardBrandIcon brand={card.brand} />
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Final</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white tracking-widest">•••• {card.lastFour}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{card.name}</h3>
                <div className="flex items-center space-x-2">
                   <div className="w-5 h-5 bg-amber-400 text-white rounded-full flex items-center justify-center shadow-lg shadow-amber-400/20">
                     <Star size={10} fill="white" />
                   </div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Status Ultra High Net Worth</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Fator Acúmulo</p>
                  <p className="text-lg font-black text-brand-red">{card.pointsPerDollar} <span className="text-[10px] opacity-70">pts/$</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Média Mensal</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{card.avgMonthlyPoints.toLocaleString('pt-BR')} <span className="text-[10px] opacity-70">pts</span></p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card Placeholder */}
        <button className="bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 group hover:border-brand-red/40 transition-all min-h-[280px]">
          <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-red group-hover:scale-110 transition-all shadow-sm">
            <CardIcon size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Adicionar novo cartão</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Otimize seu acúmulo mensal</p>
          </div>
        </button>
      </div>

      {/* Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-brand-red text-white rounded-[2rem] flex items-center justify-center shrink-0 glow-red">
              <Zap size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Upgrade Estratégico</h3>
              <p className="text-slate-400 font-medium leading-relaxed mb-6">
                Baseado no seu perfil de gastos, identificamos que o cartão <span className="text-white font-bold italic">Inter Black Win</span> traria uma economia incremental de <span className="text-emerald-500 font-bold">R$ 4.200/ano</span> em taxas de câmbio e bônus de transferência exclusivos.
              </p>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95">
                Ver Análise de Viabilidade
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-3xl mb-6">
            <TrendingUp size={32} />
          </div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">3.2 pts / BRL</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-6">Eficiência Média de Gastos</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
             <div className="bg-brand-red h-full w-[85%] rounded-full shadow-lg shadow-brand-red/20"></div>
          </div>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Você está no <span className="text-brand-red">TOP 5%</span> de eficiência financeira.</p>
        </div>
      </div>
    </div>
  );
};

export default CardsView;
