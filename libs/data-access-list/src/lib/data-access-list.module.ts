import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromList from './+state/list/list.reducer';
import { ListEffects } from './+state/list/list.effects';
import { ListFacade } from './+state/list/list.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromList.LIST_FEATURE_KEY, fromList.reducer),
    EffectsModule.forFeature([ListEffects]),
  ],
  providers: [ListFacade],
})
export class DataAccessListModule {}
