import { BehaviorSubject, combineLatest } from 'rxjs';

import { filterItemsByValue, paginateItems, sortItems } from './data-table-operations.util';
import { PageEvent, Sort } from '@list/list/domain';
import { tableConfig } from '@list/list/config';

export class CustomDataSource<T> {
  data$ = new BehaviorSubject<T[]>(null);
  filter$ = new BehaviorSubject<string>(null);
  pagination$ = new BehaviorSubject<PageEvent>({
    pageSize: tableConfig.pagination.pageSize,
    pageIndex: 0,
    length: tableConfig.pagination.pageSize
  });
  recordsCount$ = new BehaviorSubject<number>(null);
  sort$ = new BehaviorSubject<Sort>(null);

  constructor(private data: T[]) {
    this.data$.next(
      paginateItems(this.data, this.pagination$.getValue().pageIndex, this.pagination$.getValue().pageSize)
    );

    this.recordsCount$.next(this.data.length);
    this.handleSettings();
  }

  changeFilter(filter: string): void {
    this.filter$.next(filter);
  }

  changePagination(pageEvent: PageEvent): void {
    this.pagination$.next(pageEvent);
  }

  changeSort(sort: Sort): void {
    this.sort$.next(sort);
  }

  private handleSettings(): void {
    combineLatest([
      this.filter$,
      this.pagination$,
      this.sort$
    ])
      .subscribe(() => {
        this.data$.next(this.getOutputData(this.data));
        this.recordsCount$.next(this.getRecordsCount(this.data));
      });
  }

  private getOutputData(items: T[]): T[] {
    const filteredItems = filterItemsByValue<T>(items, this.filter$.getValue());
    const sortedItems = this.sort$.getValue()
      ? sortItems<T>(
        filteredItems,
        this.sort$.getValue().active,
        this.sort$.getValue().direction
      )
      : filteredItems;

    this.recordsCount$.next(sortedItems.length);

    return paginateItems<T>(sortedItems, this.pagination$.getValue().pageIndex, this.pagination$.getValue().pageSize);
  }

  private getRecordsCount(items: T[]): number {
    return filterItemsByValue<T>(items, this.filter$.getValue()).length;
  }
}
