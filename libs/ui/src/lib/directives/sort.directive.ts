import { Directive, Host, HostListener, Input } from '@angular/core';

import { SortDirection } from '@list/shared';
import { TableComponent } from '../components/table/table.component';

@Directive({
  selector: '[listSort]'
})
export class SortDirective {
  @Input('listSort')
  active: string;

  private currentDirection: SortDirection;

  @HostListener('click')
  onClick() {
    this.currentDirection = !this.currentDirection || this.currentDirection === SortDirection.DESC
      ? SortDirection.ASC
      : SortDirection.DESC;

    this.table.dataSource.changeSort({
      active: this.active,
      direction: this.currentDirection
    });
  }

  constructor(@Host() private table: TableComponent<any>) {}
}
