import { Component, Input } from '@angular/core';
import { CustomDataSource } from '@list/shared';

@Component({
  selector: 'list-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  headElements = [];

  @Input()
  dataSource: CustomDataSource<any>;
}
