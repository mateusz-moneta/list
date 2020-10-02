import { createAction, props } from '@ngrx/store';

import { Company } from '../../interfaces/company.interface';

export const loadCompanyList = createAction('[List] Load Company List');

export const loadCompanyListSuccess = createAction(
  '[List] Load Company List Success',
  props<{ companyList: Company[] }>()
);

export const loadCompanyListFailure = createAction(
  '[List] Load Company List Failure',
  props<{ error: any }>()
);
