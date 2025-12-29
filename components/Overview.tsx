
import React from 'react';
import { TrendingUp, Target, Calculator, Wallet, ArrowUpRight, ShieldCheck } from 'lucide-react';
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
  ResponsiveContainer, 
  Cell 
} from 'recharts';

// Dados expandidos para um gráfico mais rico e visualmente impactante
const chartData = [
  { date: '05 Jan', economy: 4200, potential: 1100 },
  { date: '15 Jan', economy: 5800, potential: 1400 },
  { date: '25 Jan', economy: 7200, potential: 1800 },
  { date: '05 Fev', economy: 9100, potential: 2100 },
  { date: '15 Fev', economy: 11500, potential: 2400 },
  { date: '25 Fev', economy: 13800, potential: 2800 },
  { date: '05 Mar', economy: 15900, potential: 3100 },
  { date: '15 Mar', economy: 18200, potential: 3500 },
  { date: '25 Mar', economy: 21500, potential: 3900 },
  { date: '05 Abr', economy: 24800, potential: 4200 },
];

interface OverviewProps {
  data: ClientData;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 no-overflow-x">
      {/* Seção de KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Meta de Economia" value={`R$ ${data.annualTarget.toLocaleString('pt-BR')}`} icon={Target} />
        <MetricCard label="Economia Realizada" value={`R$ ${data.realizedSavings.toLocaleString('pt-BR')}`} trend={{ value: 12.5, isUp: true }} icon={TrendingUp} variant="highlight" />
        <MetricCard label="Projeção Anual" value={`R$ ${data.projectedSavings.toLocaleString('pt-BR')}`} icon={Calculator} />
        <MetricCard label="Milhas Totais" value={`${(data.totalMiles / 1000000).toFixed(1)} Mi`} icon={Wallet} />
      </div>

      {/* Container do Gráfico Estratégico - Altura Fixa Forçada para Garantir Exibição */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Elemento de brilho decorativo no fundo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Análise de Gestão Fly Per Points</h2>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.25em] pl-1">Impacto Financeiro: Inteligência vs. Operação Comum</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-brand-red shadow-lg shadow-brand-red/40 animate-pulse"></div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest">Gestão Premium</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest">Cenário Sem Estratégia</span>
            </div>
          </div>
        </div>
        
        {/* Área do Gráfico com Altura Fixa - Essencial para Recharts em layouts flexíveis */}
        <div className="w-full h-[450px] md:h-[500px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={chartData} 
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="gradientEconomy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E34248" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#E34248" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#94a3b822" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} 
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 800}} 
                tickFormatter={(value) => `R$ ${value/1000}k`} 
              />
              <Tooltip 
                cursor={{ stroke: '#E34248', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{ 
                  borderRadius: '1.5rem', 
                  border: 'none', 
                  backgroundColor: '#0E2335', 
                  color: '#fff', 
                  fontSize: '12px',
                  fontWeight: 800, 
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  padding: '20px'
                }}
                itemStyle={{ color: '#fff', padding: '4px 0' }}
                formatter={(value: any, name: string) => {
                  const label = name === 'economy' ? 'Com Gestão' : 'Sem Estratégia';
                  return [`R$ ${value.toLocaleString('pt-BR')}`, label];
                }}
                labelStyle={{ marginBottom: '12px', color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid #ffffff11', paddingBottom: '8px' }}
              />
              
              {/* Área preenchida para a economia com gestão */}
              <Area 
                type="monotone" 
                dataKey="economy" 
                stroke="#E34248" 
                strokeWidth={5}
                fillOpacity={1} 
                fill="url(#gradientEconomy)" 
                animationDuration={2500}
                activeDot={{ r: 8, fill: '#E34248', stroke: '#fff', strokeWidth: 3 }}
              />

              {/* Barras discretas para o potencial sem estratégia (comparação visual direta) */}
              <Bar 
                dataKey="potential" 
                barSize={14} 
                fill="#94a3b8" 
                opacity={0.3} 
                radius={[6, 6, 0, 0]}
                animationDuration={2000}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Rodapé Informativo do Gráfico */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Diferencial de Lucro Incremental</p>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-black text-slate-900 dark:text-white">R$ 20.600</p>
              <div className="flex items-center text-[11px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <ArrowUpRight size={14} className="mr-1" /> 490% ROI
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Eficiência Operacional</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-black text-slate-900 dark:text-white">5.8x</p>
              <span className="text-[11px] font-black text-brand-red bg-brand-red/10 px-3 py-1.5 rounded-xl border border-brand-red/20 uppercase tracking-widest">Aceleração</span>
            </div>
          </div>
          <div className="hidden lg:flex flex-col justify-center">
             <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all active:scale-95">
               Extrair Dashboard Consolidado (PDF)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
