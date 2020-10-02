import { Company } from '../interfaces/company.interface';

export interface CompanySummary extends Company {
  totalIncome: number;
  averageIncome: number;
  lastMonthIncome: number;
}
