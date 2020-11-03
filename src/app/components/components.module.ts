import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePopoverComponent } from './home-popover/home-popover.component';
import { CreateTransModalComponent } from './create-trans-modal/create-trans-modal.component';
import { FormsModule } from '@angular/forms';


const components = [
  HomePopoverComponent,
  CreateTransModalComponent 
]
@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
