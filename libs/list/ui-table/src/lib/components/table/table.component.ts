import { Component, Input } from '@angular/core';

import { FieldConfiguration } from '@list/list/domain';
import { CustomDataSource } from '@list/list/util-data-table';

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
