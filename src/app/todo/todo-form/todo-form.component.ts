import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo, TodoService} from '../todo.service';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  todo: Todo;
  pageHeader: string;
  buttonText: string;

  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private todoService: TodoService) {
    this.todoForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getTodoById();
    // we can subscribe and react on form value changes
    // Observable.combineLatest(
    //   this.todoForm.get('id').valueChanges,
    //   this.todoForm.get('title').valueChanges
    // ).subscribe(([rate = 0, hours = 0]) => {
    //   console.log(rate * hours);
    // });
  }

  getTodoById() {
    this.route.params.subscribe(params => {
      const todoId = params.id;
      if (todoId) {
        this.todoService.getById(todoId).subscribe(todo => {
          this.todoForm.patchValue(todo);
          this.todo = todo;
          this.pageHeader = 'Edit Todo';
          this.buttonText = 'Save';
          // this.loadingService.resolve('invoice');
        });
      } else {
        this.todo = new Todo();
        this.pageHeader = 'New Todo';
        this.buttonText = 'Create';
        // this.loadingService.resolve('invoice');
      }
    });
  }

  onSubmit() {
    if (this.todo.id) {
      this.todoService.update<Todo>(this.todo.id, this.todoForm.value)
        .subscribe(response => {
          this.view(response.id);
        });
    } else {
      this.todoService.create<Todo>(this.todoForm.value)
        .subscribe(response => {
          this.view(response.id);
        });
    }
  }

  private view(id: string) {
    this.router.navigate(['/todos', id]);
  }

  back() {
    this.location.back();
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {name: this.todo.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteById(this.todo.id)
          .subscribe(() => {
            this.back();
          });
      }
    });
  }
}