
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
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, trend, icon: Icon, color = "amber" }) => {
  const colorMap: any = {
    amber: "bg-amber-100 text-amber-600",
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    indigo: "bg-indigo-100 text-indigo-600"
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${trend.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
            <span>{trend.isUp ? '+' : '-'}{trend.value}%</span>
            {trend.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          </div>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
        {subValue && <p className="text-slate-400 text-sm font-medium">{subValue}</p>}
      </div>
    </div>
  );
};

export default MetricCard;
