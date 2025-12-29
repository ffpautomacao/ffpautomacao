
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

// Dados simulados para visualização estática (Meses relativos)
const comparativeData = [
  { month: 'Jan', withFPP: 4500, withoutFPP: 1100 },
  { month: 'Fev', withFPP: 7800, withoutFPP: 1400 },
  { month: 'Mar', withFPP: 12500, withoutFPP: 1900 },
  { month: 'Abr', withFPP: 19200, withoutFPP: 2400 },
  { month: 'Mai', withFPP: 26800, withoutFPP: 2900 },
  { month: 'Jun', withFPP: 34500, withoutFPP: 3500 },
  { month: 'Jul', withFPP: 42100, withoutFPP: 4100 },
  { month: 'Ago', withFPP: 58400, withoutFPP: 4800 },
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

      {/* SEÇÃO DE PERFORMANCE COMPARATIVA - VISUAL PARA TESTE */}
      <div className="w-full bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative flex flex-col min-h-[680px]">
        
        {/* Cabeçalho da Seção com Filtros de Data */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6 relative z-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-3">
              <Zap className="text-brand-red fill-brand-red" size={28} />
              Performance Comparativa
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Visão Estratégica: Gestão FPP vs. Cenário Comum</p>
          </div>

          {/* Menus Suspensos de Seleção (Mês e Ano) */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none focus:ring-4 focus:ring-brand-red/5 transition-all cursor-pointer min-w-[150px]">
                <option>Janeiro</option>
                <option>Fevereiro</option>
                <option>Março</option>
                <option>Abril</option>
                <option>Maio</option>
                <option>Junho</option>
                <option>Julho</option>
                <option selected>Agosto</option>
                <option>Setembro</option>
                <option>Outubro</option>
                <option>Novembro</option>
                <option>Dezembro</option>
              </select>
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={14} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand-red transition-colors" size={14} />
            </div>

            <div className="relative group">
              <select className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none focus:ring-4 focus:ring-brand-red/5 transition-all cursor-pointer min-w-[110px]">
                <option>2023</option>
                <option selected>2024</option>
                <option>2025</option>
              </select>
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={14} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-brand-red transition-colors" size={14} />
            </div>
          </div>
        </div>

        {/* Legendas Customizadas */}
        <div className="flex items-center gap-10 mb-10 px-2 overflow-x-auto whitespace-nowrap pb-2 lg:pb-0">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-brand-red shadow-lg shadow-brand-red/40 border-2 border-white dark:border-slate-800"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Com Gestão FPP</span>
              <span className="text-[9px] font-bold text-emerald-500 uppercase">Economia Ativa</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-800"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sem Gestão</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Cenário Padrão</span>
            </div>
          </div>
        </div>
        
        {/* ÁREA DO GRÁFICO - ALTURA FIXA E VISIBILIDADE FORÇADA */}
        <div className="flex-1 w-full relative z-10" style={{ height: '450px', minHeight: '450px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={comparativeData} 
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="gradientFPP" x1="0" y1="0" x2="0" y2="1">
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
                  borderRadius: '1.5rem', 
                  border: 'none', 
                  backgroundColor: '#0E2335', 
                  color: '#fff', 
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  padding: '20px'
                }}
                itemStyle={{ color: '#fff', padding: '4px 0', fontSize: '13px', fontWeight: 'bold' }}
                labelStyle={{ marginBottom: '10px', color: '#94a3b8', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '1px solid #ffffff11', paddingBottom: '8px' }}
                formatter={(value: any, name: string) => {
                  const label = name === 'withFPP' ? 'Gestão Fly Per Points' : 'Sem Gestão Estratégica';
                  return [`R$ ${value.toLocaleString('pt-BR')}`, label];
                }}
              />
              
              {/* Barras: Sem Gestão (Cenário de Perda de Oportunidade) */}
              <Bar 
                name="withoutFPP"
                dataKey="withoutFPP" 
                barSize={40} 
                fill="#94a3b8" 
                opacity={0.2} 
                radius={[8, 8, 0, 0]}
                animationDuration={1500}
              />

              {/* Área Premium: Com Gestão FPP (Economia Real) */}
              <Area 
                name="withFPP"
                type="monotone" 
                dataKey="withFPP" 
                stroke="#E34248" 
                strokeWidth={5}
                fillOpacity={1} 
                fill="url(#gradientFPP)" 
                animationDuration={2500}
                activeDot={{ r: 8, strokeWidth: 4, stroke: '#fff', fill: '#E34248' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Sumário de ROI Incremental */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Diferencial Estratégico</span>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-black text-slate-900 dark:text-white">R$ 53.600</p>
                <div className="flex items-center text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                  <ArrowUpRight size={14} className="mr-1" /> +1.116% ROI
                </div>
              </div>
            </div>
            <div className="h-12 w-[1px] bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Fator de Aceleração</span>
              <p className="text-3xl font-black text-brand-red">12.1x</p>
            </div>
          </div>
          
          <div className="bg-brand-red/5 border border-brand-red/20 p-5 rounded-3xl flex items-center gap-5 max-w-md">
            <div className="w-12 h-12 bg-brand-red text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-red/20">
              <ShieldCheck size={24} />
            </div>
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
              Baseado na projeção de <span className="text-brand-red">Agosto</span>, sua meta anual está <span className="text-brand-red">92% concluída</span>. A curva de crescimento acentuada reflete as emissões em classe executiva com milhas de baixo custo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
