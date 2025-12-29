
import React from 'react';
import { ClientData } from '../types';
import { AlertCircle, ArrowRightLeft, CreditCard as CardIcon } from 'lucide-react';

interface MilesViewProps {
  data: ClientData;
}

const MilesView: React.FC<MilesViewProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.milesPrograms.map((program) => (
          <div key={program.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img src={program.logo} alt={program.name} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900">{program.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">Programa Ativo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-900">{program.available.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Milhas</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {program.expiring.some(e => e.amount > 0) ? (
                program.expiring.filter(e => e.amount > 0).map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-rose-50 rounded-2xl">
                    <div className="flex items-center space-x-2 text-rose-600">
                      <AlertCircle size={14} />
                      <span className="text-xs font-semibold">{exp.amount.toLocaleString()} vencem em {exp.days} dias</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <span className="text-xs font-semibold text-emerald-600">Sem vencimentos próximos</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Últimas Movimentações</h2>
          <div className="space-y-6">
            {data.history.map((item) => (
              <div key={item.id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl transition-colors ${
                    item.type === 'transfer' ? 'bg-amber-100 text-amber-600' : 
                    item.type === 'emission' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {item.type === 'transfer' ? <ArrowRightLeft size={18} /> : 
                     item.type === 'emission' ? <CardIcon size={18} /> : <AlertCircle size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.description}</h4>
                    <p className="text-xs text-slate-400">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${item.value.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <ArrowRightLeft className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Simulador de Transferência</h3>
          <p className="text-sm text-slate-500 max-w-xs mb-6">
            Descubra o melhor momento para transferir seus pontos baseando-se em campanhas históricas.
          </p>
          <button className="px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition-colors">
            Iniciar Simulação
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilesView;
