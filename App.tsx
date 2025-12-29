
import React, { useState, useEffect, useMemo } from 'react';
import { Bell, Search, Sun, Moon, Menu, User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import MilesView from './components/MilesView';
import TripsView from './components/TripsView';
import CardsView from './components/CardsView';
import Login from './components/Login';
import NPS from './components/NPS';
import { View, ClientData } from './types';
import { mockClientData } from './mockData';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.OVERVIEW);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const logoLight = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/fbd05d8cf9e69e8980904af8505adfdf15d9bf07/Light.png";
  const logoDark = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/fbd05d8cf9e69e8980904af8505adfdf15d9bf07/Black.png";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const viewTitles: Record<View, string> = {
    [View.OVERVIEW]: 'Visão Geral',
    [View.MILES]: 'Milhas & Pontos',
    [View.CARDS]: 'Cartões',
    [View.TRIPS]: 'Viagens',
    [View.HISTORY]: 'Histórico',
    [View.SUPPORT]: 'Suporte'
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return mockClientData;
    
    const term = searchTerm.toLowerCase();
    
    return {
      ...mockClientData,
      trips: mockClientData.trips.filter(t => 
        t.origin.toLowerCase().includes(term) || 
        t.destination.toLowerCase().includes(term) ||
        t.airline?.toLowerCase().includes(term)
      ),
      milesPrograms: mockClientData.milesPrograms.filter(p => 
        p.name.toLowerCase().includes(term)
      ),
      history: mockClientData.history.filter(h => 
        h.description.toLowerCase().includes(term)
      )
    };
  }, [searchTerm]);

  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={() => setIsAuthenticated(true)} 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case View.OVERVIEW:
        return <Overview data={filteredData} />;
      case View.MILES:
        return <MilesView data={filteredData} />;
      case View.TRIPS:
        return <TripsView data={filteredData} />;
      case View.CARDS:
        return <CardsView data={filteredData} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-6">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center text-brand-red mb-2 glow-red border-4 border-white dark:border-slate-700">
              <Menu size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Em Desenvolvimento</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 font-medium">
                Estamos integrando seus dados via Supabase para fornecer uma experiência de gestão em tempo real.
              </p>
            </div>
            <button 
              onClick={() => setCurrentView(View.OVERVIEW)}
              className="px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold transition-transform active:scale-95"
            >
              Voltar ao Início
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-brand-navy transition-colors duration-300 no-overflow-x">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isDarkMode={isDarkMode} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 lg:ml-72 w-full flex flex-col min-w-0 max-w-full">
        {/* Header */}
        <header className="h-20 md:h-24 bg-white/80 dark:bg-brand-navy/80 backdrop-blur-xl sticky top-0 z-40 px-4 md:px-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 md:space-x-5">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bem-vindo a Fly Per Points</h2>
              <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight">{mockClientData.name}</p>
            </div>
            <div className="sm:hidden">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{mockClientData.name.split(' ')[0]}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/40 px-3 md:px-5 py-2 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-all focus-within:ring-4 focus-within:ring-brand-red/10 w-24 xs:w-32 md:w-64 xl:w-80">
              <Search size={16} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-[10px] md:text-sm w-full dark:text-white placeholder:text-slate-400 font-bold"
              />
            </div>

            <div className="flex items-center space-x-1 md:space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-1.5 md:p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl md:rounded-2xl transition-all"
                aria-label="Alternar Tema"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button className="relative p-1.5 md:p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl md:rounded-2xl transition-all">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 w-2 h-2 bg-brand-red rounded-full border-2 border-white dark:border-brand-navy glow-red"></span>
              </button>

              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

              {/* Ícone agora com a cor vermelha da paleta do projeto */}
              <div className="flex items-center space-x-3 group cursor-pointer p-0.5 md:p-1 rounded-2xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50">
                <div className="w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-[1.1rem] bg-brand-red text-white flex items-center justify-center font-black text-[10px] md:text-base shadow-lg shadow-brand-red/20 glow-red">
                  {mockClientData.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 p-4 md:p-10 max-w-[1600px] mx-auto w-full no-overflow-x">
          
          {/* Logo Mobile - Traço vermelho removido conforme solicitado */}
          <div className="lg:hidden flex flex-col items-center justify-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
             <img 
               src={isDarkMode ? logoDark : logoLight} 
               alt="Fly Per Points" 
               className="h-20 md:h-32 w-auto object-contain transition-transform"
             />
          </div>

          {/* Cabeçalho de View - Centralizado no Mobile e Tablet (md e lg) */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6 items-center lg:items-start text-center lg:text-left">
            <div className="animate-in slide-in-from-left duration-500 flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 md:w-8 h-[2px] bg-brand-red"></span>
                <p className="text-[9px] md:text-[10px] font-bold text-brand-red uppercase tracking-[0.3em]">
                  GESTÃO DE {viewTitles[currentView].toUpperCase()}
                </p>
                <span className="w-6 lg:hidden h-[2px] bg-brand-red"></span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {currentView === View.OVERVIEW ? 'Visão Executiva' : 
                 currentView === View.TRIPS ? 'Meus Itinerários' : 
                 currentView === View.MILES ? 'Ativos de Fidelidade' : viewTitles[currentView]}
              </h1>
            </div>
          </div>

          <div className="min-h-0">
            {renderContent()}
            <NPS />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto px-6 py-8 text-center border-t border-slate-200 dark:border-slate-800/50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></div>
            <p className="text-[8px] md:text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] whitespace-nowrap opacity-60">
              &copy; 2026 Fly Per Points • Gestão em Viagens
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
