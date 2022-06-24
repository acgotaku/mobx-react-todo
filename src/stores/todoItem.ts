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
  toggleCompleted = () => {
    this.completed = !this.completed;
  };

  @action
  updateTitle = (title: string) => {
    this.title = title;
  };
}
