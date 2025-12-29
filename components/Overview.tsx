
import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, Calculator, Wallet, Sparkles } from 'lucide-react';
import { ClientData } from '../types';
import MetricCard from './MetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getStrategicInsights } from '../services/geminiService';

const chartData = [
  { name: 'Jan', economy: 4200, potential: 5000 },
  { name: 'Fev', economy: 6800, potential: 7500 },
  { name: 'Mar', economy: 9500, potential: 10000 },
  { name: 'Abr', economy: 12400, potential: 13000 },
];

interface OverviewProps {
  data: ClientData;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const [insight, setInsight] = useState<string>("Carregando insights estratégicos...");
  const progressPercent = Math.min(100, Math.round((data.realizedSavings / data.annualTarget) * 100));

  useEffect(() => {
    getStrategicInsights(data).then(setInsight);
  }, [data]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Meta de Economia" 
          value={`R$ ${data.annualTarget.toLocaleString('pt-BR')}`} 
          subValue="Meta anual contratada"
          icon={Target} 
          color="indigo"
        />
        <MetricCard 
          label="Economia Realizada" 
          value={`R$ ${data.realizedSavings.toLocaleString('pt-BR')}`} 
          trend={{ value: 12.5, isUp: true }}
          icon={TrendingUp} 
          color="emerald"
        />
        <MetricCard 
          label="Projeção Anual" 
          value={`R$ ${data.projectedSavings.toLocaleString('pt-BR')}`} 
          subValue={`${Math.round((data.projectedSavings / data.annualTarget) * 100)}% da meta estimada`}
          icon={Calculator} 
          color="amber"
        />
        <MetricCard 
          label="Milhas Totais" 
          value={`${(data.totalMiles / 1000000).toFixed(1)} Mi`} 
          subValue="Ativos disponíveis"
          icon={Wallet} 
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Evolução da Economia</h2>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-xs text-slate-500 font-medium">Realizado</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                <span className="text-xs text-slate-500 font-medium">Sem Gestão</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="economy" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEc)" />
                <Area type="monotone" dataKey="potential" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl h-full flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-amber-500 mb-4">
                <Sparkles size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">IA Strategic Insight</span>
              </div>
              <div className="text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none">
                 {insight.split('\n').map((line, i) => (
                   <p key={i} className="mb-2">{line}</p>
                 ))}
              </div>
            </div>
            <div className="mt-8 relative z-10">
              <div className="flex justify-between text-xs font-medium mb-2 text-slate-400">
                <span>Progresso da Meta Anual</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
