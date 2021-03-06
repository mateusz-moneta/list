import { Income } from '../interfaces/income.interface';

export class Calculation {
  constructor(private incomes: Income[]) {}

  get averageIncome(): number {
    return Math.round((this.totalIncome / this.count) * 100) / 100;
  }

  get lastMonthIncome(): number {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);

    const lastMonthIncome = this.incomes
      .filter(income => {
        const separatedDate = income.date.split('T')[0].split('-');

        return parseInt(separatedDate[0],10) === date.getFullYear() && parseInt(separatedDate[1], 10) === date.getMonth();
      })
      .reduce((prevIncome, nextIncome) => prevIncome + parseFloat(nextIncome.value), 0);

    return Math.round(lastMonthIncome * 100) / 100;
  }

  get totalIncome(): number {
    return Math.round(this.incomes.reduce((prevIncome, nextIncome) => prevIncome + parseFloat(nextIncome.value), 0) * 100) / 100;
  }

  private get count(): number {
    return this.incomes.length;
  }
}
