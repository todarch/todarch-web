import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Todo, TodoService} from './todo.service';
import {EMPTY, Observable, of} from 'rxjs';
import {ErrorResponse} from '../shared/error-response';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoResolverService implements Resolve<Todo> {

  constructor(private todoService: TodoService,
              private router: Router) {}

  /**
   * in case of an error:
   *  - return false: no feedback to user, no action taken
   *  - return null: moved to template, why product is null?
   *  - navigate to error page
   */
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Todo> {
    const id = route.paramMap.get('id');
    return null;
    // return this.todoService.getById(id)
    //   .pipe(
    //     catchError((err: ErrorResponse) => {
    //       console.log(err);
    //       this.router.navigate(['not-found']);
    //       return EMPTY;
    //     })
    //   );
    // resolver manages the subscription for us
    // it will not continue until the data is returned
  }
}
