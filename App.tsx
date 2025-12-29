
import React, { useState } from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import MilesView from './components/MilesView';
import { View } from './types';
import { mockClientData } from './mockData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (currentView) {
      case View.OVERVIEW:
        return <Overview data={mockClientData} />;
      case View.MILES:
        return <MilesView data={mockClientData} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
               <Menu size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Módulo em Desenvolvimento</h2>
            <p className="text-slate-500 max-w-sm">
              Esta funcionalidade está sendo preparada para o seu perfil premium e estará disponível em breve.
            </p>
            <button 
              onClick={() => setCurrentView(View.OVERVIEW)}
              className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl font-medium"
            >
              Voltar ao Início
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-slate-400">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-sm font-medium text-slate-400">Bem-vindo de volta,</h2>
              <p className="text-lg font-bold text-slate-900 leading-none">{mockClientData.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 group transition-all focus-within:ring-2 focus-within:ring-amber-500/20">
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar viagem ou bilhete..." 
                className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-100"></div>
              <button className="flex items-center space-x-3 hover:bg-slate-50 p-1 rounded-2xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900 font-bold shadow-md shadow-amber-500/20">
                  ES
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-8 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {currentView === View.OVERVIEW ? 'Dashboard Executivo' : 
                 currentView === View.MILES ? 'Milhas & Pontos' : 'Gerenciamento'}
              </h1>
              <p className="text-slate-500 mt-1">
                {currentView === View.OVERVIEW ? 'Sua jornada rumo à economia de elite.' : 'Gerencie seus ativos de fidelidade.'}
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                Período: 2024
              </button>
              <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                Exportar Relatório
              </button>
            </div>
          </div>

          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="mt-12 px-8 py-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium">
            &copy; 2024 MileMaster Premium Management. Sistema de Alta Performance para Viajantes de Elite.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
