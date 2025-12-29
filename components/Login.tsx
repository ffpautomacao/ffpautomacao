
import React, { useState } from 'react';
import { Mail, Lock, Sun, Moon, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, toggleTheme }) => {
  const [loading, setLoading] = useState(false);
  const logoLight = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/1f83dc841cc89122814f55c8c9901e25095dbf50/Prancheta%201_6.png";
  const logoDark = "https://raw.githubusercontent.com/ffpautomacao/ffpautomacao/8f524a38dcf2d9f61b68b60bd2046296e0e2f2dd/Prancheta%201_10.png";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-brand-navy transition-colors duration-500 overflow-hidden fixed inset-0 no-overflow-x">
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 transition-all z-50"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-lg flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center -mb-4"> {/* Minimal margins around logo */}
          <img 
            src={isDarkMode ? logoDark : logoLight} 
            alt="Fly Per Points" 
            className="h-64 md:h-80 lg:h-[450px] w-auto object-contain"
          />
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none w-full relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Bem-vindo</h1>
            <p className="text-base text-slate-500 dark:text-slate-400">Acesse sua inteligência de viagens Fly Per Points.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-5">Credencial / Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-red transition-colors" size={20} />
                <input 
                  type="text"
                  required
                  placeholder="Seu email premium"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent dark:border-slate-700/50 rounded-[1.5rem] focus:border-brand-red/30 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-lg font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-5">Senha Privada</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-red transition-colors" size={20} />
                <input 
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent dark:border-slate-700/50 rounded-[1.5rem] focus:border-brand-red/30 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-lg font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-brand-red text-white font-bold text-lg rounded-[1.5rem] glow-red active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-70 group"
            >
              {loading ? (
                <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>ACESSAR GESTÃO</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button className="text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-brand-red transition-colors tracking-widest uppercase">
              Recuperar Acesso
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-[11px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.3em]">
          &copy; 2024 Fly Per Points • Gestão em Viagens
        </p>
      </div>
    </div>
  );
};

export default Login;
