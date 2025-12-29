
import React from 'react';
import { TrendingUp, Target, Calculator, Wallet, ArrowUpRight, ShieldCheck, Zap, ChevronDown, Calendar } from 'lucide-react';
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

// Dados simulados para visualização estática (Meses do ano)
const comparativeData = [
  { month: 'Jan', withFPP: 4500, withoutFPP: 1200 },
  { month: 'Fev', withFPP: 7200, withoutFPP: 1500 },
  { month: 'Mar', withFPP: 11800, withoutFPP: 2100 },
  { month: 'Abr', withFPP: 18500, withoutFPP: 2800 },
  { month: 'Mai', withFPP: 24200, withoutFPP: 3200 },
  { month: 'Jun', withFPP: 31000, withoutFPP: 3900 },
  { month: 'Jul', withFPP: 39800, withoutFPP: 4500 },
  { month: 'Ago', withFPP: 54200, withoutFPP: 5200 },
];

interface OverviewProps {
  data: ClientData;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-1000 no-overflow-x">
      {/* KPIs Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Meta de Economia" value={`R$ ${data.annualTarget.toLocaleString('pt-BR')}`} icon={Target} />
        <MetricCard label="Economia Realizada" value={`R$ ${data.realizedSavings.toLocaleString('pt-BR')}`} trend={{ value: 12.5, isUp: true }} icon={TrendingUp} variant="highlight" />
        <MetricCard label="Projeção Anual" value={`R$ ${data.projectedSavings.toLocaleString('pt-BR')}`} icon={Calculator} />
        <MetricCard label="Milhas Totais" value={`${(data.totalMiles / 1000000).toFixed(1)} Mi`} icon={Wallet} />
      </div>

      {/* SEÇÃO DE PERFORMANCE COMPARATIVA */}
      <div className="w-full bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative flex flex-col min-h-[650px]">
        
        {/* Cabeçalho da Seção com Filtros */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6 relative z-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-3">
              <Zap className="text-brand-red fill-brand-red" size={28} />
              Performance Comparativa
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Visão Estratégica: Gestão Ativa vs. Cenário Passivo</p>
          </div>

          {/* Filtros de Data (Visuais) */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-brand-red/20 transition-all cursor-pointer min-w-[140px]">
                <option>Janeiro</option>
                <option>Fevereiro</option>
                <option>Março</option>
                <option selected>Agosto</option>
              </select>
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand-red transition-colors" size={14} />
            </div>

            <div className="relative group">
              <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-brand-red/20 transition-all cursor-pointer min-w-[110px]">
                <option selected>2024</option>
                <option>2025</option>
              </select>
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand-red transition-colors" size={14} />
            </div>
          </div>
        </div>

        {/* Legenda do Gráfico */}
        <div className="flex items-center gap-8 mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-red shadow-lg shadow-brand-red/40"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Gestão Fly Per Points</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sem Estratégia</span>
          </div>
        </div>
        
        {/* ÁREA DO GRÁFICO - VISIBILIDADE FORÇADA */}
        <div className="flex-1 w-full relative z-10" style={{ height: '450px', minHeight: '450px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={comparativeData} 
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E34248" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#E34248" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b815" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 800}} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 800}} 
                tickFormatter={(value) => `R$ ${value/1000}k`}
              />
              <Tooltip 
                cursor={{ stroke: '#E34248', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ 
                  borderRadius: '1.25rem', 
                  border: 'none', 
                  backgroundColor: '#0E2335', 
                  color: '#fff', 
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
                  padding: '16px'
                }}
                itemStyle={{ color: '#fff', padding: '2px 0', fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ marginBottom: '8px', color: '#94a3b8', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '1px solid #ffffff11', paddingBottom: '6px' }}
                formatter={(value: any, name: string) => {
                  const label = name === 'withFPP' ? 'Com Gestão FPP' : 'Sem Gestão';
                  return [`R$ ${value.toLocaleString('pt-BR')}`, label];
                }}
              />
              
              {/* Barras Discretas: Sem Gestão */}
              <Bar 
                name="withoutFPP"
                dataKey="withoutFPP" 
                barSize={32} 
                fill="#94a3b8" 
                opacity={0.2} 
                radius={[6, 6, 0, 0]}
              />

              {/* Área Premium: Com Gestão FPP */}
              <Area 
                name="withFPP"
                type="monotone" 
                dataKey="withFPP" 
                stroke="#E34248" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#premiumGradient)" 
                activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#E34248' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Sumário de ROI */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Diferencial Acumulado</span>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-black text-slate-900 dark:text-white">R$ 49.000</p>
                <div className="flex items-center text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                  <ArrowUpRight size={14} className="mr-1" /> +942% ROI
                </div>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Fator Multiplicador</span>
              <p className="text-3xl font-black text-brand-red">10.4x</p>
            </div>
          </div>
          
          <div className="bg-brand-red/5 border border-brand-red/20 p-5 rounded-3xl flex items-center gap-5 max-w-md">
            <div className="w-12 h-12 bg-brand-red text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/20">
              <ShieldCheck size={24} />
            </div>
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
              Sua gestão está convertendo ativos <span className="text-brand-red">10 vezes mais rápido</span> que a média. O pico em Agosto reflete as transferências bonificadas realizadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
