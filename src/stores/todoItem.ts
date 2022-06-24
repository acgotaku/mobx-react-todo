import { action, makeObservable, observable } from 'mobx';
import { randomId } from '@/utils/random';

export class TodoItem {
  id = randomId();

  @observable title = '';
  @observable completed = false;

  constructor(title: string) {
    makeObservable(this);
    this.title = title;
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
