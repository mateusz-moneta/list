import { HttpErrorResponse } from '@angular/common/http';

import { CompanySummary } from '../../interfaces/company-summary.interface';
import { fromListActions } from './list.actions';

export const LIST_FEATURE_KEY = 'list';

export interface ListState {
  companySummaryList: CompanySummary[];
  companySummaryListError: HttpErrorResponse;
  getCompanySummaryListInProgress: boolean;
}

export interface ListPartialState {
  readonly [LIST_FEATURE_KEY]: ListState;
}

export const initialState: ListState = {
  companySummaryList: [],
  companySummaryListError: null,
  getCompanySummaryListInProgress: false
};

export function listReducer(
  state: ListState = initialState,
  action: fromListActions.CollectiveType
): ListState {
  switch (action.type) {
    case fromListActions.Types.GetCompanySummaryList: {
      state = {
        ...state,
        getCompanySummaryListInProgress: true
      };
      break;
    }

    case fromListActions.Types.GetCompanySummaryListFail: {
      state = {
        ...state,
        companySummaryListError: action.payload.companySummaryListError,
        getCompanySummaryListInProgress: false
      };

      break;
    }

    case fromListActions.Types.GetCompanySummaryListSuccess: {
      state = {
        ...state,
        companySummaryList: action.payload.companySummaryList,
        getCompanySummaryListInProgress: false
      };

      break;
    }
  }

  return state;
}
