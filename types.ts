
export enum View {
  OVERVIEW = 'overview',
  MILES = 'miles',
  CARDS = 'cards',
  TRIPS = 'trips',
  HISTORY = 'history',
  SUPPORT = 'support'
}

export interface MilesProgram {
  id: string;
  name: string;
  total: number;
  available: number;
  expiring: {
    amount: number;
    days: number;
  }[];
  logo: string;
}

export interface CreditCard {
  id: string;
  name: string;
  lastFour: string;
  pointsPerDollar: number;
  avgMonthlyPoints: number;
  brand: 'visa' | 'mastercard' | 'amex' | 'elo';
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  class: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  type: 'Miles' | 'Cash' | 'Mixed';
  savings: number;
  status: 'Completed' | 'Upcoming';
  rating?: number;
}

export interface HistoryOperation {
  id: string;
  date: string;
  description: string;
  value: string;
  type: 'emission' | 'transfer' | 'bonus' | 'sale';
}

export interface ClientData {
  id: string;
  name: string;
  annualTarget: number;
  realizedSavings: number;
  projectedSavings: number;
  totalMiles: number;
  milesPrograms: MilesProgram[];
  cards: CreditCard[];
  trips: Trip[];
  history: HistoryOperation[];
}
