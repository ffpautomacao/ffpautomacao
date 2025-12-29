
import React from 'react';
import { TrendingUp, Target, Calculator, Wallet } from 'lucide-react';
import { ClientData } from '../types';
import MetricCard from './MetricCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const chartData = [
  { name: 'Jan', economy: 4200, potential: 3000 },
  { name: 'Fev', economy: 6800, potential: 4500 },
  { name: 'Mar', economy: 9500, potential: 6200 },
  { name: 'Abr', economy: 12400, potential: 8100 },
];

interface OverviewProps {
  data: ClientData;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 no-overflow-x">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Meta de Economia" value={`R$ ${data.annualTarget.toLocaleString('pt-BR')}`} icon={Target} />
        <MetricCard label="Economia Realizada" value={`R$ ${data.realizedSavings.toLocaleString('pt-BR')}`} trend={{ value: 12.5, isUp: true }} icon={TrendingUp} variant="highlight" />
        <MetricCard label="Projeção Anual" value={`R$ ${data.projectedSavings.toLocaleString('pt-BR')}`} icon={Calculator} />
        <MetricCard label="Milhas Totais" value={`${(data.totalMiles / 1000000).toFixed(1)} Mi`} icon={Wallet} />
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Relatório de gestão estratégica</h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Performance vs Planejamento Sem Gestão</p>
          </div>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-red rounded-full"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Com Gestão</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Sem Estratégia</span>
            </div>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E34248" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#E34248" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPot" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f033" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} tickFormatter={(value) => `R$ ${value}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0E2335', color: '#fff', fontWeight: 600, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                formatter={(value: any) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
              />
              <Area 
                name="Com Gestão"
                type="monotone" 
                dataKey="economy" 
                stroke="#E34248" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorEc)" 
              />
              <Area 
                name="Sem Estratégia"
                type="monotone" 
                dataKey="potential" 
                stroke="#94a3b8" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                fillOpacity={1}
                fill="url(#colorPot)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
