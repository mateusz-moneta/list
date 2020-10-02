import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import { ListEffects } from './list.effects';
import * as ListActions from './list.actions';

describe('ListEffects', () => {
  let actions: Observable<any>;
  let effects: ListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ListEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(ListEffects);
  });

  describe('loadCompanies$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ListActions.loadCompanyList() });

      const expected = hot('-a-|', {
        a: ListActions.loadCompanyListSuccess({ companyList: [] }),
      });

      expect(effects.loadList$).toBeObservable(expected);
    });
  });
});
