import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LIST_FEATURE_KEY, ListState } from './list.reducer';

// Lookup the 'List' feature state managed by NgRx
const getListState = createFeatureSelector<ListState>(LIST_FEATURE_KEY);

const getCompanySummaryList = createSelector(
  getListState,
  state => state.companySummaryList
);

const getCompanySummaryListInProgress = createSelector(
  getListState,
  state => state.getCompanySummaryListInProgress
);

export const listQuery = {
  getCompanySummaryList,
  getCompanySummaryListInProgress
};
