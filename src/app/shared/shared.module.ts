import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
