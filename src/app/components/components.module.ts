import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePopoverComponent } from './home-popover/home-popover.component';
import { CreateTransModalComponent } from './create-trans-modal/create-trans-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewItemModalComponent } from './new-item-modal/new-item-modal.component';
import { IonicModule } from '@ionic/angular';


const components = [
  HomePopoverComponent,
  CreateTransModalComponent, 
  NewItemModalComponent
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
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
