import { SortDirection } from '@list/list/domain';

export function filterItemsByValue<T>(items: T[], filterValue: string): T[] {
  if (filterValue) {
    return items.filter(item => Object.keys(item).some(key => item[key].toString().toLowerCase().includes(filterValue.toLowerCase())));
  }

  return items;
}

export function paginateItems<T>(items: T[], pageIndex: number, pageSize: number): T[] {
  if ((pageIndex || pageIndex === 0) && pageSize) {
    return items.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

  return items;
}

export function sortItems<T>(items: T[], active: string, direction: SortDirection): T[] {
  if (active && direction) {
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
