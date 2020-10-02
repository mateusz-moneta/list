import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ListActions from './list.actions';

@Injectable()
export class ListEffects {
  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.loadCompanyList),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ListActions.loadCompanyListSuccess({ companyList: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ListActions.loadCompanyListFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
