import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { CompanySummary } from '../../interfaces/company-summary.interface';

export namespace fromListActions {
  export enum Types {
    GetCompanySummaryList = '[List] Get Company Summary List',
    GetCompanySummaryListFail = '[[List] Get Company Summary List Fail',
    GetCompanySummaryListSuccess = '[List] Get Company Summary List Success',
    GetCompanySummarySuccess = '[List] Get Company Summary Success',
  }

  export class GetCompanySummaryList implements Action {
    readonly type = Types.GetCompanySummaryList;
  }

  export class GetCompanySummaryListFail implements Action {
    readonly type = Types.GetCompanySummaryListFail;

    constructor(public payload: HttpErrorResponse) {}
  }

  export class GetCompanySummaryListSuccess implements Action {
    readonly type = Types.GetCompanySummaryListSuccess;
  }

  export class GetCompanySummarySuccess implements Action {
    readonly type = Types.GetCompanySummarySuccess;

    constructor(public payload: CompanySummary) {}
  }

  export type CollectiveType =
    | GetCompanySummaryList
    | GetCompanySummaryListFail
    | GetCompanySummaryListSuccess
    | GetCompanySummarySuccess
}
