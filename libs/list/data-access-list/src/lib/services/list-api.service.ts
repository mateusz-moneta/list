import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Company } from '../interfaces/company.interface';
import { Income } from '../interfaces/income.interface';
import { IncomeListRequest } from '../interfaces/income-list-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {
  constructor(private httpClient: HttpClient) {}

  getCompanyList(): Observable<Company[]> {
    return this.httpClient.get<Company[]>('/api/companies');
  }

  getIncomeList(incomeListRequestPayload: IncomeListRequest): Observable<Income[]> {
    return this.httpClient.get<Income[]>(`/api/incomes/${incomeListRequestPayload.companyId}`)
      .pipe(pluck('incomes'));
  }
}
