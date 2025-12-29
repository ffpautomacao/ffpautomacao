
import { ClientData } from './types';

export const mockClientData: ClientData = {
  id: 'c123',
  name: 'Eduardo Silveira',
  annualTarget: 85000,
  realizedSavings: 54200,
  projectedSavings: 92000,
  totalMiles: 1450000,
  milesPrograms: [
    { id: 'p1', name: 'Latam Pass', total: 450000, available: 420000, expiring: [{ amount: 15000, days: 30 }], logo: 'https://picsum.photos/40/40?random=1' },
    { id: 'p2', name: 'Smiles', total: 680000, available: 680000, expiring: [], logo: 'https://picsum.photos/40/40?random=2' },
  ],
  cards: [
    { id: 'card1', name: 'Dux Visa Infinite', lastFour: '8842', pointsPerDollar: 5.0, avgMonthlyPoints: 45000, brand: 'visa' }
  ],
  trips: [
    { id: 't1', origin: 'GRU', destination: 'JFK', date: '2023-12-10', class: 'Business', type: 'Miles', savings: 12400, status: 'Completed' },
    { id: 't2', origin: 'GIG', destination: 'LHR', date: '2024-05-15', class: 'First', type: 'Mixed', savings: 18500, status: 'Scheduled' },
    // Fix: Changed type from 'Planned' to 'Miles' as 'Planned' is only a valid status, not a trip type.
    { id: 't3', origin: 'CGH', destination: 'FLN', date: '2024-10-20', class: 'Economy', type: 'Miles', savings: 800, status: 'Planned' },
  ],
  flashOffers: [
    { 
      id: 'f1', origin: 'GRU', destination: 'PAR (CDG)', date: 'Jun/2024', class: 'Economy', type: 'Cash', 
      savings: 2500, status: 'Flash', price: 'R$ 2.800', airline: 'Air France', expiresAt: '2h 15m', link: '#' 
    }
  ],
  history: []
};
