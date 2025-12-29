import React from 'react';
import { LayoutDashboard, Plane, CreditCard, Coins, History, HelpCircle, LogOut, X } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isDarkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isDarkMode, isOpen, onClose }) => {
  const menuItems = [
    { id: View.OVERVIEW, label: 'Visão Geral', icon: LayoutDashboard },
    { id: View.MILES, label: 'Milhas & Pontos', icon: Coins },
    { id: View.CARDS, label: 'Cartões', icon: CreditCard },
    { id: View.TRIPS, label: 'Viagens', icon: Plane },
    { id: View.HISTORY, label: 'Histórico', icon: History },
    { id: View.SUPPORT, label: 'Suporte', icon: HelpCircle },
  ];

  const logoLight = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/fbd05d8cf9e69e8980904af8505adfdf15d9bf07/Light.png";
  const logoDark = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/fbd05d8cf9e69e8980904af8505adfdf15d9bf07/Black.png";

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      <div className={`
        fixed left-0 top-0 h-full w-72 bg-white dark:bg-brand-navy border-r border-slate-200 dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-6 py-2 flex flex-col items-center">
          <div className="relative w-full flex justify-center -mb-8 -mt-6"> {/* Minimized margins around logo */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-0 p-2 text-slate-400 lg:hidden hover:text-brand-red transition-colors"
            >
              <X size={24} />
            </button>
            <img 
              src={isDarkMode ? logoDark : logoLight} 
              alt="Fly Per Points" 
              className="h-72 md:h-80 w-auto object-contain transition-transform"
            />
          </div>
          <p className="text-[10px] font-bold tracking-[0.4em] text-brand-red uppercase opacity-80 -mt-10">Gestão Premium</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-brand-red text-white glow-red font-bold' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-brand-red dark:hover:text-brand-red'
                }`}
              >
                <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-sm font-bold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-transparent">
          <button className="flex items-center space-x-3 text-slate-400 hover:text-brand-red transition-colors w-full px-4 group py-3">
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-bold">Sair da Conta</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;