import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodosComponent} from './todos/todos.component';
import {TodoComponent} from './todo/todo.component';
import {TodoFormComponent} from './todo-form/todo-form.component';
import {TodoResolverService} from './todo-resolver.service';


const routes: Routes = [
  // the path in AppRoutingModule is already set to todos
  { path: '', component: TodosComponent },
  { path: 'new', component: TodoFormComponent },
  { path: ':id', component: TodoComponent },
  { path: ':id/edit', component: TodoFormComponent, resolve: { resolvedTodo: TodoResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
