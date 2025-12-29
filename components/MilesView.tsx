
import React from 'react';
import { ClientData } from '../types';
import { AlertCircle, ArrowRightLeft, CreditCard as CardIcon, Coins } from 'lucide-react';

interface MilesViewProps {
  data: ClientData;
}

const MilesView: React.FC<MilesViewProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 no-overflow-x">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.milesPrograms.map((program) => (
          <div key={program.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <img src={program.logo} alt={program.name} className="w-10 h-10 rounded-lg object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{program.name}</h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Programa Ativo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-900 dark:text-white">{program.available.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] uppercase font-bold text-brand-red tracking-wider">Milhas</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {program.expiring.some(e => e.amount > 0) ? (
                program.expiring.filter(e => e.amount > 0).map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                    <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
                      <AlertCircle size={14} />
                      <span className="text-xs font-bold">{exp.amount.toLocaleString()} vencem em {exp.days} dias</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Sem vencimentos próximos</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2.5 bg-brand-red/10 text-brand-red rounded-xl">
               <History size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Últimas Movimentações</h2>
          </div>
          <div className="space-y-6">
            {data.history.length > 0 ? data.history.map((item) => (
              <div key={item.id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl transition-colors ${
                    item.type === 'transfer' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 
                    item.type === 'emission' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {item.type === 'transfer' ? <ArrowRightLeft size={18} /> : 
                     item.type === 'emission' ? <CardIcon size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.description}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${item.value.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.value}
                  </p>
                </div>
              </div>
            )) : <p className="text-slate-400 text-sm font-medium italic">Nenhum histórico encontrado para esta pesquisa.</p>}
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800/40 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[1.25rem] flex items-center justify-center shadow-sm mb-4 border border-slate-200 dark:border-slate-700">
            <ArrowRightLeft className="text-brand-red" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Simulador de Transferência</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6 font-medium">
            Descubra o melhor momento para transferir seus pontos baseando-se em campanhas históricas.
          </p>
          <button className="px-8 py-3 bg-slate-900 dark:bg-brand-red dark:hover:bg-brand-red/90 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95">
            Iniciar Simulação
          </button>
        </div>
      </div>
    </div>
  );
};

import { History } from 'lucide-react';
export default MilesView;
