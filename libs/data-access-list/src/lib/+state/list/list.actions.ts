import { Action } from '@ngrx/store';

import { GetCompanySummaryListFailActionPayload } from '../../interfaces/get-company-summary-list-fail.action-payload';
import { GetCompanySummaryListSuccessActionPayload } from '../../interfaces/get-company-summary-list-success.action-payload';

export namespace fromListActions {
  export enum Types {
    GetCompanySummaryList = '[List] Get Company Summary List',
    GetCompanySummaryListFail = '[List] Get Company Summary List Fail',
    GetCompanySummaryListSuccess = '[List] Get Company Summary List Success'
  }

  export class GetCompanySummaryList implements Action {
    readonly type = Types.GetCompanySummaryList;
  }

  export class GetCompanySummaryListFail implements Action {
    readonly type = Types.GetCompanySummaryListFail;

    constructor(public payload: GetCompanySummaryListFailActionPayload) {}
  }

  export class GetCompanySummaryListSuccess implements Action {
    readonly type = Types.GetCompanySummaryListSuccess;

    constructor(public payload: GetCompanySummaryListSuccessActionPayload) {}
  }

  export type CollectiveType =
    | GetCompanySummaryList
    | GetCompanySummaryListFail
    | GetCompanySummaryListSuccess
}
