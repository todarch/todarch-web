import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [TodosComponent, TodoComponent, TodoFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    TodosComponent
  ]
})
export class TodoModule { }
