import { Directive, Host, HostListener, Input } from '@angular/core';

import { SortDirection } from '../enum/sort-direction.enum';
import { TableComponent } from '@list/ui';

@Directive({
  selector: '[listSort]'
})
export class SortDirective {
  @Input()
  active: string;

  private currentDirection: SortDirection;

  @HostListener('click', ['$event.target'])
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
