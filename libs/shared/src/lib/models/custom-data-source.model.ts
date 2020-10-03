import { BehaviorSubject, combineLatest } from 'rxjs';

import { Filter } from '../interfaces/filter.interface';
import { PageEvent } from '../interfaces/page-event.interface';
import { Sort } from '../interfaces/sort.interface';
import { SortDirection } from '../enum/sort-direction.enum';
import { tableConfig } from '../configs/table.config';

export class CustomDataSource<T> {
  data$ = new BehaviorSubject<T[]>(null);
  filters$ = new BehaviorSubject<Filter[]>(null);
  pagination$ = new BehaviorSubject<PageEvent>({
    pageSize: tableConfig.pagination.pageSize,
    pageIndex: 0,
    length: tableConfig.pagination.pageSize
  });
  recordsCount$ = new BehaviorSubject<number>(null);
  sort$ = new BehaviorSubject<Sort>(null);

  constructor(private data: T[]) {
    this.data$.next(this.paginate(data));
    this.recordsCount$.next(data.length);
    this.handleSettings();
  }

  changeFilters(filter: Filter[]): void {
    this.filters$.next(filter);
  }

  changePagination(pageEvent: PageEvent): void {
    this.pagination$.next(pageEvent);
  }

  changeSort(sort: Sort): void {
    this.sort$.next(sort);
  }

  private handleSettings(): void {
    combineLatest([
      this.filters$,
      this.pagination$,
      this.sort$
    ])
      .subscribe(() => {
        this.data$.next(this.getOutputData(this.data));
      });
  }

  private getOutputData(items: T[]): T[] {
    const sortedItems = this.sort(items);
    const paginatedItems = this.paginate(sortedItems);

    return paginatedItems;
  }

  private paginate(items: T[]): T[] {
    if (this.pagination$.getValue()) {
      const { pageIndex, pageSize } = this.pagination$.getValue();

      return items.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    }

    return items;
  }

  private sort(items: T[]): T[] {
    if (this.sort$.getValue()) {
      const { active, direction } = this.sort$.getValue();

      switch (direction) {
        case SortDirection.ASC:
          return items.slice().sort((prev, next) => (prev[active] > next[active]) ? 1 : -1);

        case SortDirection.DESC:
          return items.slice().sort((prev, next) => (prev[active] > next[active]) ? -1 : 1);

        default:
          return items;
      }
    }

    return items;
  }
}
