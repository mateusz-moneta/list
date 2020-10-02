import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Company } from '../../interfaces/company.interface';
import * as ListActions from './list.actions';

export const LIST_FEATURE_KEY = 'list';

export interface State extends EntityState<Company> {
  selectedId?: string | number; // which List record has been selected
  loaded: boolean; // has the List list been loaded
  error?: string | null; // last known error (if any)
}

export interface ListPartialState {
  readonly [LIST_FEATURE_KEY]: State;
}

export const listAdapter: EntityAdapter<Company> = createEntityAdapter<
  Company
>();

export const initialState: State = listAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const listReducer = createReducer(
  initialState,
  on(ListActions.loadCompanyList, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ListActions.loadCompanyListSuccess, (state, { companyList }) =>
    listAdapter.setAll(companyList, { ...state, loaded: true })
  ),
  on(ListActions.loadCompanyListFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return listReducer(state, action);
}
