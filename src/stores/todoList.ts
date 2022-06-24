import { action, computed, makeObservable, observable } from 'mobx';
import { TodoItem } from './todoItem';

export class TodoList {
  @observable.shallow list: TodoItem[] = [];

  constructor(todos?: string[]) {
    makeObservable(this);
    todos?.forEach(this.addTodo);
  }

  @action
  addTodo = (text: string) => {
    this.list.push(new TodoItem(text));
  };

  @action
  removeTodo = (todo: TodoItem) => {
    this.list.splice(this.list.indexOf(todo), 1);
  };

  @action
  removeCompleted = () => {
    this.list = this.activeTodos;
  };

  @action
  toggleAll = (value: boolean) => {
    this.list.forEach(todo => {
      todo.updateCompleted(value);
    });
  };

  @computed
  get showTodo(): boolean {
    return this.list.length > 0;
  }

  @computed
  get allTodos(): TodoItem[] {
    return this.list;
  }

  @computed
  get completedTodos(): TodoItem[] {
    return this.list.filter(todo => todo.completed);
  }

  @computed
  get activeTodos(): TodoItem[] {
    return this.list.filter(todo => !todo.completed);
  }
}

export default new TodoList();
