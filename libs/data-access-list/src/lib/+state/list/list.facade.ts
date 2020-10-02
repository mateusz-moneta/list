import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromList from './list.reducer';
import * as ListSelectors from './list.selectors';

@Injectable()
export class ListFacade {
  allList$ = this.store.pipe(select(ListSelectors.getAllList));
  selectedList$ = this.store.pipe(select(ListSelectors.getSelected));

  constructor(private store: Store<fromList.ListPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
