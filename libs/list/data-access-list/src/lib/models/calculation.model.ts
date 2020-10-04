import { Income } from '../interfaces/income.interface';

export class Calculation {
  constructor(private incomes: Income[]) {}

  get averageIncome(): number {
    return Math.round((this.totalIncome / this.count) * 100) / 100;
  }

  get totalIncome(): number {
    return Math.round(this.incomes.reduce((prevMonth, nextMonth) => prevMonth + parseFloat(nextMonth.value), 0) * 100) / 100;
  }

  private get count(): number {
    return this.incomes.length;
  }
}
