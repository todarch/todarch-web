import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class Todo {
  id: string;
  title: string;
  description?: string;
}

const todos = [
  {
    id: 'xyz',
    title: 'Hello todo',
  }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  base = 'http://localhost:3000';
  resource = '/todos';

  constructor(private http: HttpClient) {}

  get url() {
    return this.base + this.resource;
  }

  getById(id: string): Observable<Todo> {
    const intId = +id;
    return this.http.get<Todo>(`${this.url}/${intId}`);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  create<T>(body: any) {
    return this.http.post<T>(this.url, body);
  }

  update<T>(id: string, body: any) {
    return this.http.put<T>(this.url + '/' + id, body);
  }

  deleteById(id: string) {
    const intId = +id;
    return this.http.delete(`${this.url}/${intId}`);
  }
}
