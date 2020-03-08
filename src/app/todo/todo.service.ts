import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AbstractService} from '../shared/abstract.service';
import {ErrorResponse} from '../shared/error-response';

export class Todo {
  id: string;
  title: string;
  description?: string;
  priority: number;
  deadline?: number;
  status: string;
  isPrivate: boolean;
  doneOn?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService extends AbstractService {
  resource = '/todos';

  constructor(private http: HttpClient) {
    super();
  }

  getById(id: string): Observable<Todo | ErrorResponse> {
    const intId = +id;
    return this.http.get<Todo>(`${this.url}/${intId}`)
      .pipe(
        catchError( err => this.handleError(`TodoService.getById(${id} failed`, err))
      );
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  getNotFinalizedTodos(): Observable<Todo[] | ErrorResponse> {
    return this.http.get<Todo[]>(`${this.url}?status=TODO`)
      .pipe(
        catchError( err => this.handleError(`TodoService.getNotFinalized failed`, err))
      );
  }

  create(newTodo: Todo): Observable<Todo> {
    newTodo.status = 'TODO';
    return this.http.post<Todo>(this.url, newTodo);
  }

  update(updatedTodo: Todo): Observable<void> {
    const id = updatedTodo.id;
    return this.http.put<void>(this.url + '/' + id, updatedTodo);
    // put does not have to return something
  }

  deleteById(id: string): Observable<void> {
    const intId = +id;
    return this.http.delete<void>(`${this.url}/${intId}`);
  }

  markAsDone(todo: Todo) {
    todo.status = 'DONE';
    todo.doneOn = new Date().getTime();
    return this.http.put<void>(this.url + '/' + todo.id, todo)
      .pipe(
        catchError(err => this.handleError(`failed to mark as done ${todo.id}`, err))
      );
  }
}
