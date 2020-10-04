import { Company } from './company.interface';

export interface CompanySummary extends Company {
  averageIncome: number;
  lastMonthIncome: number;
  totalIncome: number;
}
