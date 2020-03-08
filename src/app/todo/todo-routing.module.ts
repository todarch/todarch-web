import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodosComponent} from './todos/todos.component';
import {TodoComponent} from './todo/todo.component';
import {TodoFormComponent} from './todo-form/todo-form.component';
import {TodoResolverService} from './todo-resolver.service';


const routes: Routes = [
  { path: 'todos', component: TodosComponent },
  { path: 'todos/new', component: TodoFormComponent },
  { path: 'todos/:id', component: TodoComponent },
  { path: 'todos/:id/edit', component: TodoFormComponent, resolve: { resolvedTodo: TodoResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
