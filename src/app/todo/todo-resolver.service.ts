import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Todo, TodoService} from './todo.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoResolverService implements Resolve<Todo> {

  constructor(private todoService: TodoService) {}

  /**
   * in case of an error:
   *  - return false: no feedback to user, no action taken
   *  - return null: moved to template, why product is null?
   *  - navigate to error page
   */
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Todo> {
    const id = route.paramMap.get('id');
    return this.todoService.getById(id);
    // resolver manages the subscription for us
    // it will not continue until the data is returned
  }
}
