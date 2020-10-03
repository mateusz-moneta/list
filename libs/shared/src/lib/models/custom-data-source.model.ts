import { BehaviorSubject } from 'rxjs';

import { Filter } from '../interfaces/filter.interface';
import { PageEvent } from '../interfaces/page-event.interface';
import { Sort } from '../interfaces/sort.interface';
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

  constructor(data: T[]) {
    this.data$.next(data);
    this.recordsCount$.next(data.length)
  }

  changeFilters(filter: Filter[]): void {
    this.filters$.next(filter);
  }

  changePagination(pageEvent: PageEvent): void {}

  changeSort(sort: Sort): void {
    this.sort$.next(sort);
  }
}
