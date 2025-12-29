
import React from 'react';
import { LayoutDashboard, Plane, CreditCard, Coins, History, HelpCircle, LogOut } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: View.OVERVIEW, label: 'Visão Geral', icon: LayoutDashboard },
    { id: View.MILES, label: 'Milhas & Pontos', icon: Coins },
    { id: View.CARDS, label: 'Cartões', icon: CreditCard },
    { id: View.TRIPS, label: 'Viagens', icon: Plane },
    { id: View.HISTORY, label: 'Histórico', icon: History },
    { id: View.SUPPORT, label: 'Suporte', icon: HelpCircle },
  ];

  return (
    <div className="w-64 h-full bg-slate-900 text-white flex flex-col fixed left-0 top-0 shadow-2xl z-50 transition-all duration-300">
      <div className="p-8">
        <h1 className="text-2xl font-premium tracking-tighter text-amber-500">MILEMASTER</h1>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Management Group</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-amber-500 text-slate-900 font-semibold shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button className="flex items-center space-x-3 text-slate-400 hover:text-rose-400 transition-colors w-full px-4">
          <LogOut size={20} />
          <span className="text-sm">Sair da Conta</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
