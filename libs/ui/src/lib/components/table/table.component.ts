import { Component, Input } from '@angular/core';

import { CustomDataSource, FieldConfiguration, SortDirection } from '@list/shared';

@Component({
  selector: 'list-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> {
  @Input()
  dataSource: CustomDataSource<T>;

  @Input()
  fieldConfiguration: FieldConfiguration[] = [];

  private currentDirection: SortDirection;

  changeSort(active: string): void {
    this.currentDirection = !this.currentDirection || this.currentDirection === SortDirection.DESC
      ? SortDirection.ASC
      : SortDirection.DESC;

    this.dataSource.changeSort({
      active,
      direction: this.currentDirection
    });
  }
}
