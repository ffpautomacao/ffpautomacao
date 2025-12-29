
import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon: LucideIcon;
  variant?: 'default' | 'highlight';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, trend, icon: Icon, variant = 'default' }) => {
  return (
    <div className={`p-6 rounded-3xl border transition-all duration-300 ${
      variant === 'highlight' 
      ? 'bg-brand-red text-white border-brand-red glow-red shadow-lg shadow-brand-red/20' 
      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-2xl ${
            variant === 'highlight' ? 'bg-white/20' : 'bg-brand-red/10 text-brand-red'
          }`}>
            <Icon size={24} />
          </div>
          <p className={`text-[11px] font-bold uppercase tracking-widest ${
            variant === 'highlight' ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
          }`}>{label}</p>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-bold ${
            variant === 'highlight' ? 'text-white' : (trend.isUp ? 'text-emerald-500' : 'text-rose-500')
          }`}>
            <span>{trend.isUp ? '+' : '-'}{trend.value}%</span>
            {trend.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          </div>
        )}
      </div>
      <div className="pl-1">
        <h3 className={`text-2xl font-bold mb-1 ${
          variant === 'highlight' ? 'text-white' : 'text-slate-900 dark:text-white'
        }`}>{value}</h3>
        {subValue && <p className={`text-sm font-medium ${
          variant === 'highlight' ? 'text-white/60' : 'text-slate-400'
        }`}>{subValue}</p>}
      </div>
    </div>
  );
};

export default MetricCard;
