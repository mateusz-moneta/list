import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { fromListActions } from './list.actions';
import { ListPartialState } from './list.reducer';
import { listQuery } from './list.selectors';

@Injectable()
export class ListFacade {
  companySummaryList$ = this.store.pipe(select(listQuery.getCompanySummaryList));
  getCompanySummaryListInProgress$ = this.store.pipe(select(listQuery.getCompanySummaryListInProgress));

  constructor(private store: Store<ListPartialState>) {}

  getCompanySummaryList(): void {
    this.store.dispatch(new fromListActions.GetCompanySummaryList());
  }
}
