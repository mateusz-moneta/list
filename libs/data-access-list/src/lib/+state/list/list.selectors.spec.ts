import { ListEntity } from './list.models';
import { State, listAdapter, initialState } from './list.reducer';
import * as ListSelectors from './list.selectors';

describe('List Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getListId = (it) => it['id'];
  const createListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ListEntity);

  let state;

  beforeEach(() => {
    state = {
      list: listAdapter.setAll(
        [
          createListEntity('PRODUCT-AAA'),
          createListEntity('PRODUCT-BBB'),
          createListEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('List Selectors', () => {
    it('getAllList() should return the list of List', () => {
      const results = ListSelectors.getAllList(state);
      const selId = getListId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ListSelectors.getSelected(state);
      const selId = getListId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getListLoaded() should return the current 'loaded' status", () => {
      const result = ListSelectors.getListLoaded(state);

      expect(result).toBe(true);
    });

    it("getListError() should return the current 'error' state", () => {
      const result = ListSelectors.getListError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
