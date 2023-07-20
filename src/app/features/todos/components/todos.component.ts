import {Component, OnInit} from '@angular/core';
import {TodosService} from "../services/todos.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todosService.getTodos().then((response: any) => {
      response.json().then((data: any) => {
        this.todos = data;
      });
    });
  }
}
