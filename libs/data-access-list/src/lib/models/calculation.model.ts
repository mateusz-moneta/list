import { Income } from '../interfaces/income.interface';

export class Calculation {
  constructor(private incomes: Income[]) {}

  get averageIncome(): number {
    return this.totalIncome / this.count;
  }

  get totalIncome(): number {
    return this.incomes.reduce((prevMonth, nextMonth) => prevMonth + parseFloat(nextMonth.value), 0);
  }

  private get count(): number {
    return this.incomes.length;
  }
}
