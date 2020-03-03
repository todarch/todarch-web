import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Todo, TodoService} from '../todo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {DeleteDialogComponent} from '../../shared/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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

  todos: Todo[];

  displayedColumns = [
    'id',
    'title',
    'priority',
    'actions'
  ];

  constructor(private todoService: TodoService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.todoService.getAllTodos()
      .subscribe(
      todos => {
        this.todos = todos;
        this.dataSource = new MatTableDataSource<Todo>(todos);
        this.initTable();
        console.log(todos);
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
            const index = this.dataSource.data.indexOf(todo);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          });
      }
    });

  }

  done(row: Todo) {

  }
}
