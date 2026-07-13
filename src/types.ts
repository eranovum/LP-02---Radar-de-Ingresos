export interface BusinessModel {
  name: string;
  category: string;
  description: string;
  minCapital: number;
  minHoursPerDay: number;
  difficulty: 'Bajo' | 'Medio' | 'Alto';
  compatibility: number;
  pros: string[];
  cons: string[];
  icon: string;
}

export interface UserProfile {
  capital: number;
  hours: number;
  experience: 'Principiante' | 'Intermedio' | 'Avanzado';
  preferredArea: string;
}

export interface Plan {
  id: 'basic' | 'vip';
  name: string;
  price: number;
  originalPrice?: number;
  subtitle: string;
  features: string[];
  bonusesIncluded: boolean;
}

export interface Bonus {
  id: number;
  title: string;
  value: number;
  description: string;
  bullets: string[];
  tag: string;
}
