import { Income } from '@list/data-access-list';

export interface IncomeListResponsePayload {
  id: number;
  incomes: Income[];
}
