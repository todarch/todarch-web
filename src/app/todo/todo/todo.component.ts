import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo, TodoService} from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: Todo;

  constructor(private todoService: TodoService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.getTodoById(params.id);
      }
    );
    // <!-- const id = this.route.snapshot.paramMap.get('id'); -->
    // <!-- this.getTodoById(id); -->
  }

  getTodoById(id: string) {
    this.todoService.getById(id).subscribe(todo => {
      if (!todo) {
        this.router.navigate(['/not-found']);
      }
      this.onTodoRetrieved(todo);
      }
    );
  }

  private onTodoRetrieved(todo: Todo) {
    console.log(todo);
    this.todo = todo;
  }

  goBack() {
   this.location.back();
  }
}
