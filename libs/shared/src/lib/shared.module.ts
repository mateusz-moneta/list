import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from './custom-material.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [CustomMaterialModule]
})
export class SharedModule {}
