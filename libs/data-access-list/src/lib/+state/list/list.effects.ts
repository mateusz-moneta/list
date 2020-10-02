import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { forkJoin, Observable } from 'rxjs';
import { concatAll, finalize, map, switchMap } from 'rxjs/operators';

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
                companySummary => new fromListActions.GetCompanySummarySuccess(companySummary)
              )
            )
          ),
          finalize(() => new fromListActions.GetCompanySummaryListSuccess())
        ),
    onError: (action: fromListActions.GetCompanySummaryList, error: HttpErrorResponse) => new fromListActions.GetCompanySummaryListFail(error)
  });

  getCompanySummaryList(companyList: Company[]): Observable<CompanySummary> {
    return forkJoin(
      companyList
        .sort((prev, next) => (prev.id > next.id) ? 1 : -1)
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
    ).pipe(concatAll());
  }

  constructor(
    private dp: DataPersistence<ListPartialState>,
    private actions$: Actions,
    private listApiService: ListApiService
  ) {}
}
