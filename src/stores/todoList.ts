import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { TodoItem } from './todoItem';

export class TodoList {
  @observable.shallow list: TodoItem[] = [];

  constructor() {
    makeObservable(this);
    makePersistable(this, {
      name: 'TodoStore',
      properties: ['list'],
      storage: window.localStorage
    }).then(() => {
      this.fromJS();
    });
  }

  @action
  private fromJS = () => {
    this.list = this.list.map(
      todo => new TodoItem(todo.title, todo.id, todo.completed)
    );
  };

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
