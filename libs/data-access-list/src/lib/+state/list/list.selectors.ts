import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LIST_FEATURE_KEY,
  State,
  ListPartialState,
  listAdapter,
} from './list.reducer';

// Lookup the 'List' feature state managed by NgRx
export const getListState = createFeatureSelector<ListPartialState, State>(
  LIST_FEATURE_KEY
);

const { selectAll, selectEntities } = listAdapter.getSelectors();

export const getListError = createSelector(
  getListState,
  (state: State) => state.error
);

export const getAllList = createSelector(getListState, (state: State) =>
  selectAll(state)
);

export const getListEntities = createSelector(getListState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getListState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getListEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
