
import React, { useState, useEffect, useMemo } from 'react';
import { Bell, Search, Sun, Moon, Menu, User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import MilesView from './components/MilesView';
import TripsView from './components/TripsView';
import Login from './components/Login';
import { View, ClientData } from './types';
import { mockClientData } from './mockData';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.OVERVIEW);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
        <header className="h-24 bg-white/80 dark:bg-brand-navy/80 backdrop-blur-xl sticky top-0 z-40 px-6 md:px-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-5">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bem-vindo a Fly Per Points</h2>
              <p className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{mockClientData.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/40 px-4 md:px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700/50 transition-all focus-within:ring-4 focus-within:ring-brand-red/10 w-40 md:w-64 xl:w-80">
              <Search size={18} className="text-slate-400 mr-2 md:mr-3" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full dark:text-white placeholder:text-slate-400 font-bold"
              />
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
                aria-label="Alternar Tema"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className="relative p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-white dark:border-brand-navy glow-red"></span>
              </button>

              <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

              <div className="flex items-center space-x-3 group cursor-pointer p-1.5 rounded-2xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50">
                <div className="w-11 h-11 rounded-[1.1rem] bg-brand-red text-white flex items-center justify-center font-bold shadow-lg shadow-brand-red/20 glow-red">
                  {mockClientData.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full no-overflow-x">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="animate-in slide-in-from-left duration-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-[2px] bg-brand-red"></span>
                <p className="text-[10px] font-bold text-brand-red uppercase tracking-[0.3em]">
                  GESTÃO DE {viewTitles[currentView].toUpperCase()}
                </p>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {currentView === View.OVERVIEW ? 'Visão Executiva' : 
                 currentView === View.TRIPS ? 'Meus Itinerários' : 
                 currentView === View.MILES ? 'Ativos de Fidelidade' : viewTitles[currentView]}
              </h1>
            </div>
          </div>

          <div className="min-h-0">
            {renderContent()}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto px-10 py-10 text-center border-t border-slate-200 dark:border-slate-800/50">
          <div className="flex flex-col items-center gap-4">
            <div className="h-[2px] w-12 bg-slate-200 dark:bg-slate-800"></div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.4em]">
              &copy; 2024 Fly Per Points • Gestão em Viagens
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
