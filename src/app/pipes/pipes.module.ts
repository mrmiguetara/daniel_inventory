import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockPipe } from './stock.pipe';



@NgModule({
  declarations: [StockPipe],
  exports: [
    StockPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
