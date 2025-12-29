
import React from 'react';
import { ClientData, Trip } from '../types';
import { Plane, Calendar, CheckCircle, Zap, ExternalLink, Clock } from 'lucide-react';

interface TripsViewProps {
  data: ClientData;
}

const TripCard: React.FC<{ trip: any, isFlash?: boolean }> = ({ trip, isFlash }) => (
  <div className={`p-4 rounded-[1.5rem] border transition-all ${
    isFlash 
    ? 'bg-brand-red/5 border-brand-red/20 glow-red' 
    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
  }`}>
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-slate-900 dark:text-white">{trip.origin}</span>
        <div className="p-1 bg-brand-red/10 rounded-lg">
          <Plane size={14} className="text-brand-red rotate-90" />
        </div>
        <span className="text-lg font-bold text-slate-900 dark:text-white">{trip.destination}</span>
      </div>
      {isFlash && (
        <span className="bg-brand-red text-white text-[10px] px-2 py-1 rounded-full animate-pulse flex items-center gap-1 font-bold">
          <Zap size={10} /> FLASH
        </span>
      )}
    </div>
    
    <div className="space-y-3 text-xs font-bold text-slate-500 dark:text-slate-400">
      <div className="flex items-center space-x-2">
        <Calendar size={14} className="text-slate-400" />
        <span>{trip.date}</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle size={14} className="text-emerald-500" />
        <span>Classe {trip.class}</span>
      </div>
      {trip.airline && (
         <div className="mt-1 font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
           {trip.airline}
         </div>
      )}
    </div>

    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
      <div>
        <p className="text-[10px] uppercase text-slate-400 font-bold mb-0.5 tracking-wider">Economia</p>
        <p className="text-base font-bold text-emerald-500">R$ {trip.savings.toLocaleString('pt-BR')}</p>
      </div>
      {isFlash ? (
        <a href={trip.link} className="flex items-center gap-1 bg-brand-red text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-red/90 transition-all glow-red">
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

const TripsView: React.FC<TripsViewProps> = ({ data }) => {
  const sections = [
    { title: 'Viagens Feitas', icon: CheckCircle, filter: 'Completed' },
    { title: 'Viagens Agendadas', icon: Calendar, filter: 'Scheduled' },
    { title: 'Viagens à Realizar', icon: Plane, filter: 'Planned' },
  ];

  return (
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
              data.trips.filter(t => t.status === sec.filter).map(t => <TripCard key={t.id} trip={t} />)
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
  );
};

export default TripsView;
