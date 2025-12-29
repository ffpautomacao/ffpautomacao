
import React, { useState } from 'react';
import { Mail, Lock, Sun, Moon, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, toggleTheme }) => {
  const [loading, setLoading] = useState(false);
  const logoLight = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/fbd05d8cf9e69e8980904af8505adfdf15d9bf07/Light.png";
  const logoDark = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/fbd05d8cf9e69e8980904af8505adfdf15d9bf07/Black.png";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-brand-navy transition-colors duration-500 overflow-hidden fixed inset-0 no-overflow-x p-4 md:p-8">
      {/* Botão de Tema - Posicionado para não conflitar com a logo */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 right-4 md:top-6 md:right-6 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 transition-all z-50 hover:scale-105 active:scale-95"
        title="Alternar Tema"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-lg flex flex-col items-center animate-in fade-in zoom-in duration-700 h-full max-h-[90vh] justify-center">
        
        {/* Logo - Tamanho dinâmico baseado na altura da tela (vh) para evitar overflow */}
        <div className="flex justify-center mb-4 md:mb-6 shrink-0">
          <img 
            src={isDarkMode ? logoDark : logoLight} 
            alt="Fly Per Points" 
            className="h-[15vh] min-h-[120px] max-h-[220px] w-auto object-contain pointer-events-none"
          />
        </div>

        {/* Card de Login - Padding ajustado para UX e margens internas */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none w-full relative z-10 overflow-hidden">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Bem-vindo</h1>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">Acesse sua inteligência de viagens Fly Per Points.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-5">Credencial / Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-red transition-colors" size={18} />
                <input 
                  type="email"
                  required
                  placeholder="Seu email premium"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent dark:border-slate-700/50 rounded-[1.5rem] focus:border-brand-red/30 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-base md:text-lg font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-5">Senha Privada</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-red transition-colors" size={18} />
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent dark:border-slate-700/50 rounded-[1.5rem] focus:border-brand-red/30 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-base md:text-lg font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 md:py-5 bg-brand-red text-white font-bold text-base md:text-lg rounded-[1.5rem] glow-red active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-70 group mt-2 shadow-lg shadow-brand-red/20"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>ACESSAR GESTÃO</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 md:mt-8 text-center">
            <button className="text-[11px] font-bold text-slate-400 dark:text-slate-500 hover:text-brand-red transition-colors tracking-widest uppercase">
              Recuperar Acesso
            </button>
          </div>
        </div>

        {/* Rodapé - Pequeno para caber na tela sem scroll */}
        <p className="text-center mt-6 text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em] shrink-0 whitespace-nowrap">
          &copy; 2026 Fly Per Points • Gestão em Viagens
        </p>
      </div>
    </div>
  );
};

export default Login;
