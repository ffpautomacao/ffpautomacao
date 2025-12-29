
export enum View {
  OVERVIEW = 'overview',
  MILES = 'miles',
  CARDS = 'cards',
  TRIPS = 'trips',
  HISTORY = 'history',
  SUPPORT = 'support'
}

export type TripStatus = 'Completed' | 'Scheduled' | 'Planned' | 'Flash';

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  class: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  type: 'Miles' | 'Cash' | 'Mixed';
  savings: number;
  status: TripStatus;
  price?: string;
  airline?: string;
}

export interface FlashOffer extends Trip {
  expiresAt: string;
  link: string;
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
  flashOffers: FlashOffer[];
  history: any[];
}
