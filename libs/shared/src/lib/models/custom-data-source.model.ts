import { BehaviorSubject, combineLatest } from 'rxjs';

import { PageEvent } from '../interfaces/page-event.interface';
import { Sort } from '../interfaces/sort.interface';
import { SortDirection } from '../enum/sort-direction.enum';
import { tableConfig } from '../configs/table.config';

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
    this.data$.next(this.paginate(this.data));
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

  private getRecordsCount(items: T[]): number {
    return this.sort(this.filter$.getValue() ? this.filterByValue(items, this.filter$.getValue()) : items).length;
  }

  private getOutputData(items: T[]): T[] {
    const sortedItems = this.sort(this.filter$.getValue() ? this.filterByValue(items, this.filter$.getValue()) : items);
    const paginatedItems = this.paginate(sortedItems);

    return paginatedItems;
  }

  private filterByValue(items: T[], filterValue: string): T[] {
    return items.filter(item => Object.keys(item).some(key => item[key].toString().toLowerCase().includes(filterValue.toLowerCase())));
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
