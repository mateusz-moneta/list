import { Action } from '@ngrx/store';

import { GetCompanySummaryListFailPayload } from '../../payloads/get-company-summary-list-fail.payload';
import { GetCompanySummaryListSuccessPayload } from '../../payloads/get-company-summary-list-success.payload';

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

    constructor(public payload: GetCompanySummaryListFailPayload) {}
  }

  export class GetCompanySummaryListSuccess implements Action {
    readonly type = Types.GetCompanySummaryListSuccess;

    constructor(public payload: GetCompanySummaryListSuccessPayload) {}
  }

  export type CollectiveType =
    | GetCompanySummaryList
    | GetCompanySummaryListFail
    | GetCompanySummaryListSuccess
}
