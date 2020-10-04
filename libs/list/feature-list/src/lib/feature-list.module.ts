import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataAccessListModule } from '@list/list/data-access-list';
import { FeatureListRoutingModule } from './feature-list-routing.module';
import { ListComponent } from './containers/list/list.component';
import { UiFilterModule } from '@list/list/ui-filter';
import { UiPaginatorModule } from '@list/list/ui-paginator';
import { UiProgressSpinnerModule } from '@list/list/ui-progress-spinner';
import { UiTableModule } from '@list/list/ui-table';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    DataAccessListModule,
    FeatureListRoutingModule,
    UiFilterModule,
    UiPaginatorModule,
    UiProgressSpinnerModule,
    UiTableModule
  ]
})
export class FeatureListModule {}
