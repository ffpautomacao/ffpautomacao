
import React from 'react';
import { TrendingUp, Target, Calculator, Wallet, ArrowUpRight } from 'lucide-react';
import { ClientData } from '../types';
import MetricCard from './MetricCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, ComposedChart } from 'recharts';

const chartData = [
  { date: '10 Jan', economy: 4200, potential: 1200 },
  { date: '25 Jan', economy: 5500, potential: 1500 },
  { date: '12 Fev', economy: 6800, potential: 2100 },
  { date: '28 Fev', economy: 8100, potential: 2400 },
  { date: '15 Mar', economy: 9500, potential: 2900 },
  { date: '30 Mar', economy: 11200, potential: 3400 },
  { date: '14 Abr', economy: 12400, potential: 3800 },
  { date: '28 Abr', economy: 14600, potential: 4100 },
];

interface OverviewProps {
  data: ClientData;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 no-overflow-x">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Meta de Economia" value={`R$ ${data.annualTarget.toLocaleString('pt-BR')}`} icon={Target} />
        <MetricCard label="Economia Realizada" value={`R$ ${data.realizedSavings.toLocaleString('pt-BR')}`} trend={{ value: 12.5, isUp: true }} icon={TrendingUp} variant="highlight" />
        <MetricCard label="Projeção Anual" value={`R$ ${data.projectedSavings.toLocaleString('pt-BR')}`} icon={Calculator} />
        <MetricCard label="Milhas Totais" value={`${(data.totalMiles / 1000000).toFixed(1)} Mi`} icon={Wallet} />
      </div>

      {/* Modern Strategic Management Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-brand-red rounded-full glow-red"></div>
              <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Performance Estratégica Premium</h2>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Comparativo de Acúmulo e Economia Incremental</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-8 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-lg bg-brand-red shadow-lg shadow-brand-red/30"></div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest">Gestão FPP</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-lg bg-slate-300 dark:bg-slate-700"></div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest">Padrão Mercado</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full min-h-[350px] relative">
          <ResponsiveContainer width="100%" height="100%" minHeight={350}>
            <ComposedChart 
              data={chartData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEconomy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E34248" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#E34248" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f033" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} 
                tickFormatter={(value) => `R$ ${value/1000}k`} 
              />
              <Tooltip 
                cursor={{ stroke: '#E34248', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ 
                  borderRadius: '1.5rem', 
                  border: 'none', 
                  backgroundColor: '#0E2335', 
                  color: '#fff', 
                  fontSize: '11px',
                  fontWeight: 800, 
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  padding: '16px'
                }}
                itemStyle={{ color: '#fff', padding: '2px 0' }}
                formatter={(value: any) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                labelStyle={{ marginBottom: '8px', color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Area 
                type="monotone" 
                dataKey="economy" 
                stroke="#E34248" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorEconomy)" 
                animationDuration={2000}
              />
              <Bar 
                dataKey="potential" 
                barSize={12} 
                fill="#94a3b8" 
                opacity={0.2} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Diferencial Estratégico</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-slate-900 dark:text-white">R$ 10.500</p>
              <span className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} className="mr-1" /> 245%
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Velocidade de Acúmulo</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-slate-900 dark:text-white">4.2x</p>
              <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">vs Mercado</span>
            </div>
          </div>
          <div className="hidden lg:flex flex-col justify-center">
             <button className="bg-brand-red text-white py-3 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest glow-red hover:scale-105 transition-all">
               Baixar Relatório Consolidado
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
