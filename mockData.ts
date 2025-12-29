
import { ClientData } from './types';

export const mockClientData: ClientData = {
  id: 'c123',
  name: 'Eduardo Silveira',
  annualTarget: 85000,
  realizedSavings: 54200,
  projectedSavings: 92000,
  totalMiles: 1450000,
  milesPrograms: [
    {
      id: 'p1',
      name: 'Latam Pass',
      total: 450000,
      available: 420000,
      expiring: [{ amount: 15000, days: 30 }, { amount: 50000, days: 90 }],
      logo: 'https://picsum.photos/40/40?random=1'
    },
    {
      id: 'p2',
      name: 'Smiles (GOL)',
      total: 680000,
      available: 680000,
      expiring: [{ amount: 0, days: 0 }],
      logo: 'https://picsum.photos/40/40?random=2'
    },
    {
      id: 'p3',
      name: 'Azul Fidelidade',
      total: 320000,
      available: 310000,
      expiring: [{ amount: 10000, days: 15 }],
      logo: 'https://picsum.photos/40/40?random=3'
    }
  ],
  cards: [
    {
      id: 'card1',
      name: 'Dux Visa Infinite',
      lastFour: '8842',
      pointsPerDollar: 5.0,
      avgMonthlyPoints: 45000,
      brand: 'visa'
    },
    {
      id: 'card2',
      name: 'The Platinum Card',
      lastFour: '1005',
      pointsPerDollar: 2.2,
      avgMonthlyPoints: 12000,
      brand: 'amex'
    }
  ],
  trips: [
    {
      id: 't1',
      origin: 'GRU',
      destination: 'JFK',
      date: '2024-05-15',
      class: 'Business',
      type: 'Miles',
      savings: 12400,
      status: 'Upcoming'
    },
    {
      id: 't2',
      origin: 'GIG',
      destination: 'LHR',
      date: '2024-02-10',
      class: 'First',
      type: 'Mixed',
      savings: 18500,
      status: 'Completed',
      rating: 5
    },
    {
      id: 't3',
      origin: 'CGH',
      destination: 'FLN',
      date: '2024-01-05',
      class: 'Economy',
      type: 'Cash',
      savings: 450,
      status: 'Completed',
      rating: 4
    }
  ],
  history: [
    { id: 'h1', date: '2024-03-20', description: 'Transferência Bonificada 100% Livelo -> Smiles', value: '200.000 pts', type: 'transfer' },
    { id: 'h2', date: '2024-03-15', description: 'Emissão Classe Executiva GRU-JFK', value: '-120.000 milhas', type: 'emission' },
    { id: 'h3', date: '2024-03-10', description: 'Compra Bonificada Amazon (8 pts/real)', value: '14.500 pts', type: 'bonus' }
  ]
};
