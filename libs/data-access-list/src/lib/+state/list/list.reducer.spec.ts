import { ListEntity } from './list.models';
import * as ListActions from './list.actions';
import { State, initialState, reducer } from './list.reducer';

describe('List Reducer', () => {
  const createListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ListEntity);

  beforeEach(() => {});

  describe('valid List actions', () => {
    it('loadListSuccess should return set the list of known List', () => {
      const list = [
        createListEntity('PRODUCT-AAA'),
        createListEntity('PRODUCT-zzz'),
      ];
      const action = ListActions.loadListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
