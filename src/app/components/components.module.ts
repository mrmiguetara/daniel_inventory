import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePopoverComponent } from './home-popover/home-popover.component';


const components = [
  HomePopoverComponent
]
@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
