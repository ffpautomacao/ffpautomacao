
import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Calculator, Wallet, Zap, ChevronDown, Calendar } from 'lucide-react';
import { ClientData } from '../types';
import MetricCard from './MetricCard';
import { 
  ComposedChart, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

// Dados simulados para visualização estática (Performance Mensal)
const comparativeData = [
  { month: 'Jan', withFPP: 4500, withoutFPP: 1100 },
  { month: 'Fev', withFPP: 7800, withoutFPP: 1400 },
  { month: 'Mar', withFPP: 12500, withoutFPP: 1900 },
  { month: 'Abr', withFPP: 19200, withoutFPP: 2400 },
  { month: 'Mai', withFPP: 26800, withoutFPP: 2900 },
  { month: 'Jun', withFPP: 34500, withoutFPP: 3500 },
  { month: 'Jul', withFPP: 42100, withoutFPP: 4100 },
  { month: 'Ago', withFPP: 58400, withoutFPP: 4800 },
  { month: 'Set', withFPP: 64000, withoutFPP: 5200 },
  { month: 'Out', withFPP: 72000, withoutFPP: 5800 },
  { month: 'Nov', withFPP: 81000, withoutFPP: 6300 },
  { month: 'Dez', withFPP: 92000, withoutFPP: 6900 },
];

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const years = ['2024', '2025', '2026'];

interface OverviewProps {
  data: ClientData;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Garante que o layout estabilizou antes de renderizar o Recharts
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const performanceSection = (
    <div key="performance" className="w-full bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative flex flex-col min-h-[480px]">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 relative z-10">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-2">
            <Zap className="text-brand-red fill-brand-red" size={24} />
            Performance Corporativa
          </h2>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Comparativo: FPP vs. Mercado</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-8 pr-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none cursor-pointer">
              {months.map(m => <option key={m}>{m}</option>)}
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" size={12} />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
          </div>
          <div className="relative">
            <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-8 pr-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none cursor-pointer">
              {years.map(y => <option key={y}>{y}</option>)}
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" size={12} />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
          </div>
        </div>
      </div>

      {/* Legendas */}
      <div className="flex items-center gap-6 mb-6 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-red"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Nosso Serviço (FPP)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sem FPP</span>
        </div>
      </div>
      
      {/* ÁREA DO GRÁFICO */}
      <div className="w-full h-[300px] relative z-10">
        {isReady ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={comparativeData} 
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientFPP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E34248" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#E34248" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b815" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 700}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 700}} 
                tickFormatter={(value) => `R$${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '1rem', 
                  border: 'none', 
                  backgroundColor: '#0E2335', 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                  padding: '12px'
                }}
                itemStyle={{ fontSize: '12px', fontWeight: '800' }}
                labelStyle={{ fontSize: '9px', fontWeight: '900', color: '#94a3b8', marginBottom: '4px' }}
              />
              <Bar dataKey="withoutFPP" barSize={25} fill="#94a3b8" opacity={0.3} radius={[4, 4, 0, 0]} />
              <Area 
                type="monotone" 
                dataKey="withFPP" 
                stroke="#E34248" 
                strokeWidth={5}
                fill="url(#gradientFPP)" 
                activeDot={{ r: 7, strokeWidth: 0, fill: '#E34248' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-brand-red border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {/* Sumário */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">ROI Acumulado</span>
            <p className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              R$ 53.6k <span className="text-[10px] text-emerald-500">+1.1k%</span>
            </p>
          </div>
          <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-800"></div>
          <div>
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Fator de Economia</span>
            <p className="text-xl font-black text-brand-red">12.1x</p>
          </div>
        </div>
        <div className="bg-brand-red/5 px-4 py-2 rounded-xl border border-brand-red/10">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            Meta anual: <span className="text-brand-red">92% concluída</span>
          </p>
        </div>
      </div>
    </div>
  );

  const metricCardsSection = (
    <div key="metrics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <MetricCard label="Meta de Economia" value={`R$ ${data.annualTarget.toLocaleString('pt-BR')}`} icon={Target} />
      <MetricCard label="Economia Realizada" value={`R$ ${data.realizedSavings.toLocaleString('pt-BR')}`} trend={{ value: 12.5, isUp: true }} icon={TrendingUp} variant="highlight" />
      <MetricCard label="Projeção Anual" value={`R$ ${data.projectedSavings.toLocaleString('pt-BR')}`} icon={Calculator} />
      <MetricCard label="Milhas Totais" value={`${(data.totalMiles / 1000000).toFixed(1)} Mi`} icon={Wallet} />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 no-overflow-x pb-8 flex flex-col">
      {/* Em telas menores que LG (mobile/tablet), mostra Performance primeiro */}
      <div className="lg:hidden flex flex-col space-y-8">
        {performanceSection}
        {metricCardsSection}
      </div>

      {/* Em telas grandes (desktop) */}
      <div className="hidden lg:flex lg:flex-col lg:space-y-8">
        {metricCardsSection}
        {performanceSection}
      </div>
    </div>
  );
};

export default Overview;
