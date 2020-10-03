import { Component, Input } from '@angular/core';

import { CustomDataSource, FieldConfiguration } from '@list/shared';

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

  @Input()
  set filterValue(value: string) {
    this.dataSource.changeFilter(value);
  }
}
