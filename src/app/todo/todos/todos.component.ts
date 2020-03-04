import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Todo, TodoService} from '../todo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {DeleteDialogComponent} from '../../shared/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Todo>;
  dataSource: MatTableDataSource<Todo>;
  showPrivate = false;

  todos: Todo[];

  displayedColumns = [
    'id',
    'title',
    'priority',
    'actions'
  ];

  constructor(private todoService: TodoService,
              private snackBarService: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todoService.getNotFinalizedTodos()
      .subscribe(
        (todos: Todo[]) => {
          this.todos = todos;
          this.dataSource = new MatTableDataSource<Todo>(this.getTodosToShow(this.showPrivate));
          this.initTable();
          console.log(todos);
      },
        error => {

        }
    );
  }

  initTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.table) {
      this.table.dataSource = this.dataSource;
    } else {
      console.log('Todos.table was not set');
    }
  }

  hasTodos() {
    return this.todos && this.todos.length > 0;
  }

  delete(todo: Todo) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      data: {name: todo.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteById(todo.id)
          .subscribe(() => {
            this.removeFromList(todo);
            this.snackBarService.open('Todo is deleted.', 'OK', { duration: 2000 });
          });
      }
    });

  }

  private removeFromList(todo: Todo) {
    const index = this.dataSource.data.indexOf(todo);
    this.todos.splice(index, 1);
    this.dataSource.data = this.getTodosToShow(this.showPrivate);
    this.dataSource._updateChangeSubscription();
  }

  done(todo: Todo) {
    this.todoService.markAsDone(todo)
      .subscribe(
        () => {
          this.removeFromList(todo);
          this.snackBarService.open('Todo is marked as done.', 'OK', { duration: 2000 });
        },
        err => {
          this.tryAgain();
        });
  }

  private tryAgain() {
    this.snackBarService.open('Something went wrong, try again later.', 'OK', {duration: 2000});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  togglePrivate(event: MatSlideToggleChange) {
    this.showPrivate = event.checked;
    this.dataSource.data = this.getTodosToShow(this.showPrivate);
    this.dataSource._updateChangeSubscription();
  }

  getTodosToShow(showPrivate: boolean) {
    if (showPrivate) {
      return this.todos;
    } else {
      return this.todos.filter(td => !td.isPrivate);
    }
  }
}
