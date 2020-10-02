import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import { Company } from '../../interfaces/company.interface';
import { ListEffects } from './list.effects';
import { ListFacade } from './list.facade';
import * as ListActions from './list.actions';
import { LIST_FEATURE_KEY, State, reducer } from './list.reducer';

interface TestSchema {
  list: State;
}

describe('ListFacade', () => {
  let facade: ListFacade;
  let store: Store<TestSchema>;

  const createCompanyEntity = (id: number, name = '', city = '') =>
    ({
      id,
      name,
      city
    } as Company);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(LIST_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ListEffects]),
        ],
        providers: [ListFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ListFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allList$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ListActions.loadCompanyList());

        list = await readFirst(facade.allList$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadListSuccess` to manually update list
     */
    it('allList$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allList$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ListActions.loadCompanyListSuccess({
            companyList: [
              createCompanyEntity(78, 'MacGyver - Gleason','West Jameson'),
              createCompanyEntity(82, 'Howell - Hoeger', 'Gulgowskiview')
            ],
          })
        );

        list = await readFirst(facade.allList$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
