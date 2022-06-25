import { action, makeObservable, observable } from 'mobx';
import { randomId } from '@/utils/random';

export class TodoItem {
  id = randomId();

  @observable title = '';
  @observable completed = false;

  constructor(title: string, id = randomId(), completed = false) {
    makeObservable(this);

    this.title = title;
    this.id = id;
    this.completed = completed;
  }

  @action
  updateCompleted = (value: boolean) => {
    this.completed = value;
  };

  @action
  updateTitle = (title: string) => {
    this.title = title;
  };
}
