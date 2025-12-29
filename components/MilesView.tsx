
import React from 'react';
import { ClientData } from '../types';
import { AlertCircle, ArrowRightLeft, CreditCard as CardIcon, Coins, History, Zap, ShieldAlert, ArrowRight } from 'lucide-react';

interface MilesViewProps {
  data: ClientData;
}

const MilesView: React.FC<MilesViewProps> = ({ data }) => {
  // Função para determinar o nível de urgência e estilo do alerta
  const getUrgencyStyles = (days: number) => {
    if (days <= 30) return {
      bg: 'bg-rose-50 dark:bg-rose-950/30',
      border: 'border-rose-100 dark:border-rose-900/40',
      text: 'text-rose-600 dark:text-rose-400',
      icon: <ShieldAlert size={16} />,
      label: 'URGENTE',
      btn: 'bg-rose-600 hover:bg-rose-700 text-white'
    };
    if (days <= 90) return {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-100 dark:border-amber-900/30',
      text: 'text-amber-600 dark:text-amber-400',
      icon: <AlertCircle size={16} />,
      label: 'ATENÇÃO',
      btn: 'bg-amber-600 hover:bg-amber-700 text-white'
    };
    return {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-100 dark:border-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      icon: <AlertCircle size={16} />,
      label: 'PROGRAMADO',
      btn: 'bg-blue-600 hover:bg-blue-700 text-white'
    };
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 no-overflow-x">
      {/* Programas de Fidelidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.milesPrograms.map((program) => (
          <div key={program.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-inner">
                  <img src={program.logo} alt={program.name} className="w-10 h-10 rounded-lg object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{program.name}</h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Ativo Digital</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{program.available.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] uppercase font-bold text-brand-red tracking-widest">Saldo Disponível</p>
              </div>
            </div>
            
            <div className="space-y-4 mt-auto">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Alertas de Vencimento</p>
              
              {program.expiring.some(e => e.amount > 0) ? (
                // Ordenar por dias para priorizar os que vencem antes
                [...program.expiring]
                  .filter(e => e.amount > 0)
                  .sort((a, b) => a.days - b.days)
                  .map((exp, idx) => {
                    const styles = getUrgencyStyles(exp.days);
                    return (
                      <div key={idx} className={`flex flex-col p-4 rounded-2xl border ${styles.bg} ${styles.border} transition-all`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className={`flex items-center space-x-2 ${styles.text}`}>
                            {styles.icon}
                            <span className="text-[10px] font-black tracking-widest uppercase">{styles.label}</span>
                          </div>
                          <span className={`text-[10px] font-bold ${styles.text}`}>EXPIRA EM {exp.days} DIAS</span>
                        </div>
                        
                        <div className="flex items-end justify-between">
                          <div>
                            <p className={`text-lg font-bold ${styles.text}`}>
                              {exp.amount.toLocaleString('pt-BR')} milhas
                            </p>
                          </div>
                          <button className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${styles.btn}`}>
                            RESGATAR <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Patrimônio Seguro</p>
                    <p className="text-[11px] font-medium text-emerald-600/70 dark:text-emerald-400/70">Sem pontos expirando em breve.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Seção Inferior: Histórico e Simulador */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-brand-red/10 text-brand-red rounded-2xl">
                 <History size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Fluxo de Ativos</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Últimas movimentações de milhas</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {data.history.length > 0 ? data.history.map((item) => (
              <div key={item.id} className="flex items-center justify-between group p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-2xl transition-all cursor-default">
                <div className="flex items-center space-x-5">
                  <div className={`p-3 rounded-xl transition-all group-hover:scale-110 ${
                    item.type === 'transfer' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                    item.type === 'emission' ? 'bg-brand-red/10 text-brand-red' : 
                    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {item.type === 'transfer' ? <ArrowRightLeft size={20} /> : 
                     item.type === 'emission' ? <Zap size={20} /> : <Coins size={20} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.description}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-black ${item.value.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.value}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">PONTOS</p>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest italic opacity-50">Nenhuma movimentação</p>
              </div>
            )}
          </div>
        </div>

        {/* Simulador Estratégico */}
        <div className="bg-slate-900 dark:bg-slate-950 p-10 rounded-[2rem] border border-slate-800 relative overflow-hidden group">
          {/* Decoração de Fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-brand-red/20 transition-all duration-700"></div>
          
          <div className="relative z-10 flex flex-col h-full items-center justify-center text-center">
            <div className="w-20 h-20 bg-brand-red text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-red/40 mb-8 animate-bounce-slow glow-red">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Potencialize seus Ativos</h3>
            <p className="text-slate-400 max-w-sm mb-10 leading-relaxed font-medium">
              Nosso algoritmo analisa campanhas históricas para sugerir o <span className="text-brand-red font-bold">momento exato</span> de transferir seus pontos com até 120% de bônus.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full mb-10">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Último Bônus</p>
                <p className="text-xl font-bold text-white">100%</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Previsão</p>
                <p className="text-xl font-bold text-emerald-500">Alta</p>
              </div>
            </div>
            <button className="w-full py-5 bg-white text-slate-900 hover:bg-slate-100 text-sm font-black rounded-2xl transition-all active:scale-95 shadow-xl uppercase tracking-widest">
              Consultar Inteligência
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilesView;
