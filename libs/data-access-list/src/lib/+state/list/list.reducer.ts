import { CompanySummary } from '../../interfaces/company-summary.interface';
import { fromListActions } from './list.actions';

export const LIST_FEATURE_KEY = 'list';

export interface ListState {
  companySummaryList: CompanySummary[];
  getCompanySummaryListInProgress: boolean;
}

export interface ListPartialState {
  readonly [LIST_FEATURE_KEY]: ListState;
}

export const initialState: ListState = {
  companySummaryList: [],
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
        getCompanySummaryListInProgress: false
      };
      break;
    }

    case fromListActions.Types.GetCompanySummaryListSuccess: {
      state = {
        ...state,
        getCompanySummaryListInProgress: false,
      };
      break;
    }

    case fromListActions.Types.GetCompanySummarySuccess: {
      state = {
        ...state,
        companySummaryList: [
          ...state.companySummaryList,
          action.payload
        ]
      };
      break;
    }
  }

  return state;
}
