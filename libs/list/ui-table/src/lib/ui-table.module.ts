import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortDirective } from './directives/sort.directive';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [CommonModule],
  exports: [TableComponent],
  declarations: [
    SortDirective,
    TableComponent
  ]
})
export class UiTableModule {}
