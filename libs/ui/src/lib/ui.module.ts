import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { SharedModule } from '@list/shared';
import { SortDirective } from './directives/sort.directive';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CustomPageComponent,
    PaginatorComponent,
    ProgressSpinnerComponent,
    SortDirective,
    TableComponent,
    FilterComponent
  ],
  exports: [
    PaginatorComponent,
    ProgressSpinnerComponent,
    SortDirective,
    TableComponent,
    FilterComponent
  ]
})
export class UiModule {}
