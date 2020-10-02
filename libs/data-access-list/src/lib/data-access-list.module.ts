import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';

import { initialState, LIST_FEATURE_KEY, listReducer } from './+state/list/list.reducer';
import { ListApiService } from './services/list-api.service';
import { ListEffects } from './+state/list/list.effects';
import { ListFacade } from './+state/list/list.facade';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(LIST_FEATURE_KEY, listReducer, { initialState }),
    EffectsModule.forFeature([ListEffects])
  ],
  providers: [DataPersistence, ListApiService, ListFacade],
})
export class DataAccessListModule {}
