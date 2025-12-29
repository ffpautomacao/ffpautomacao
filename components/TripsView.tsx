
import React, { useState } from 'react';
import { ClientData, Trip } from '../types';
import { Plane, Calendar, CheckCircle, Zap, ExternalLink, Clock, X, Info, ShieldCheck, Wallet, MapPin } from 'lucide-react';

interface TripsViewProps {
  data: ClientData;
}

const TripCard: React.FC<{ trip: any, isFlash?: boolean, onClick?: () => void }> = ({ trip, isFlash, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-[1.5rem] border transition-all cursor-pointer group ${
    isFlash 
    ? 'bg-brand-red/5 border-brand-red/20 glow-red' 
    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-red/30 hover:shadow-lg'
  }`}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-slate-900 dark:text-white">{trip.origin}</span>
        <div className="p-1 bg-brand-red/10 rounded-lg group-hover:scale-110 transition-transform">
          <Plane size={14} className="text-brand-red rotate-90" />
        </div>
        <span className="text-lg font-bold text-slate-900 dark:text-white">{trip.destination}</span>
      </div>
      {isFlash && (
        <span className="bg-brand-red text-white text-[10px] px-2 py-1 rounded-full animate-pulse flex items-center gap-1 font-bold">
          <Zap size={10} /> FLASH
        </span>
      )}
      {!isFlash && trip.status === 'Completed' && (
        <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-full">
          <CheckCircle size={14} />
        </div>
      )}
    </div>
    
    <div className="space-y-3 text-xs font-bold text-slate-500 dark:text-slate-400">
      <div className="flex items-center space-x-2">
        <Calendar size={14} className="text-slate-400" />
        <span>{trip.date}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Info size={14} className="text-slate-400" />
        <span>{trip.class}</span>
      </div>
    </div>

    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
      <div>
        <p className="text-[10px] uppercase text-slate-400 font-bold mb-0.5 tracking-wider">Economia</p>
        <p className="text-base font-bold text-emerald-500">R$ {trip.savings.toLocaleString('pt-BR')}</p>
      </div>
      {isFlash ? (
        <a 
          href={trip.link} 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 bg-brand-red text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-red/90 transition-all glow-red"
        >
          RESERVAR <ExternalLink size={10} />
        </a>
      ) : (
        <div className="text-right">
          <p className="text-[10px] uppercase text-slate-400 font-bold mb-0.5 tracking-wider">Tipo</p>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{trip.type}</p>
        </div>
      )}
    </div>
    {isFlash && (
      <div className="mt-3 flex items-center gap-1 text-[10px] text-brand-red font-bold uppercase tracking-wider">
        <Clock size={12} /> Expira em: {trip.expiresAt}
      </div>
    )}
  </div>
);

const TripDetailModal: React.FC<{ trip: Trip, onClose: () => void }> = ({ trip, onClose }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
    <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md" onClick={onClose}></div>
    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
      
      {/* Header Modal */}
      <div className="bg-brand-red p-8 text-white relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Relatório de Viagem</span>
          {trip.status === 'Completed' && <span className="px-3 py-1 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">Concluída</span>}
        </div>
        <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
          {trip.origin} <Plane className="rotate-90" size={24} /> {trip.destination}
        </h2>
        <p className="text-white/70 font-bold text-sm mt-1 uppercase tracking-widest">{trip.date}</p>
      </div>

      {/* Content Modal */}
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 mb-3">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Classe de Cabine</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{trip.class}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 mb-3">
              <Wallet size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Forma de Resgate</span>
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{trip.type === 'Miles' ? '100% Milhas' : trip.type}</p>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20 mb-4">
              <Zap size={24} />
            </div>
            <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-1">Impacto Financeiro Fly Per Points</p>
            <h3 className="text-4xl font-black text-emerald-600 dark:text-emerald-400">R$ {trip.savings.toLocaleString('pt-BR')}</h3>
            <p className="text-sm font-medium text-emerald-600/60 dark:text-emerald-400/60 mt-2">Economia estratégica gerada nesta emissão</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
             <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
               <MapPin size={18} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest">Rota Estratégica</p>
               <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Emissão realizada via parceiros internacionais</p>
             </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          FECHAR RESUMO
        </button>
      </div>
    </div>
  </div>
);

const TripsView: React.FC<TripsViewProps> = ({ data }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const sections = [
    { title: 'Viagens Feitas', icon: CheckCircle, filter: 'Completed' },
    { title: 'Viagens Agendadas', icon: Calendar, filter: 'Scheduled' },
    { title: 'Viagens à Realizar', icon: Plane, filter: 'Planned' },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-bottom-4 duration-500 no-overflow-x">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-6">
            <div className="flex items-center space-x-3 px-2">
              <div className="p-2.5 bg-brand-red/10 rounded-xl text-brand-red">
                <sec.icon size={20} />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">{sec.title}</h3>
            </div>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar no-overflow-x">
              {data.trips.filter(t => t.status === sec.filter).length > 0 ? (
                data.trips.filter(t => t.status === sec.filter).map(t => (
                  <TripCard 
                    key={t.id} 
                    trip={t} 
                    onClick={t.status === 'Completed' ? () => setSelectedTrip(t) : undefined}
                  />
                ))
              ) : (
                <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest italic">Nenhum registro</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Flash Offers Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 px-2">
            <div className="p-2.5 bg-brand-red text-white rounded-xl shadow-lg shadow-brand-red/20 glow-red">
              <Zap size={20} />
            </div>
            <h3 className="font-bold text-brand-red text-lg">Oportunidade Relâmpago</h3>
          </div>
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar no-overflow-x">
            {data.flashOffers.length > 0 ? data.flashOffers.map(f => <TripCard key={f.id} trip={f} isFlash />) : (
              <div className="p-6 rounded-2xl border-2 border-dashed border-brand-red/20 text-center bg-brand-red/5">
                  <p className="text-sm text-brand-red font-bold uppercase tracking-widest italic opacity-50">Sem ofertas ativas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedTrip && (
        <TripDetailModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}
    </div>
  );
};

export default TripsView;
