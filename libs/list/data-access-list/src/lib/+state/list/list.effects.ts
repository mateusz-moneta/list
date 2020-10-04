import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Calculation } from '../../models/calculation.model';
import { Company } from '../../interfaces/company.interface';
import { CompanySummary } from '../../interfaces/company-summary.interface';
import { fromListActions } from './list.actions';
import { ListApiService } from '../../services/list-api.service';
import { ListPartialState } from './list.reducer';

@Injectable()
export class ListEffects {
  @Effect()
  getCompanySummaryList$ = this.dp.fetch(fromListActions.Types.GetCompanySummaryList, {
    run: () =>
      this.listApiService
        .getCompanyList()
        .pipe(
          switchMap(companyList =>
            this.getCompanySummaryList(companyList).pipe(
              map(
                companySummaryList => new fromListActions.GetCompanySummaryListSuccess({ companySummaryList })
              )
            )
          )
        ),
    onError: (action: fromListActions.GetCompanySummaryList, error: HttpErrorResponse) =>
      new fromListActions.GetCompanySummaryListFail({ companySummaryListError: error})
  });

  private getCompanySummaryList(companyList: Company[]): Observable<CompanySummary[]> {
    return forkJoin(
      companyList
        .map((company, index) =>
          this.listApiService.getIncomeList({ companyId: company.id })
            .pipe(
              map(incomeList => {
                const calculation = new Calculation(incomeList);

                return {
                  ...company,
                  averageIncome: calculation.averageIncome,
                  lastMonthIncome: 1,
                  totalIncome: calculation.totalIncome
                } as CompanySummary;
              })
            )
        )
    );
  }

  constructor(
    private dp: DataPersistence<ListPartialState>,
    private actions$: Actions,
    private listApiService: ListApiService
  ) {}
}
