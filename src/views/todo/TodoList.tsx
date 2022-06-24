import { TodoItem as ITodoItem } from '@/stores/todoItem';
import TodoItem from './TodoItem';

interface ITodoListProps {
  todos: ITodoItem[];
}

const TodoList: React.FC<ITodoListProps> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};

export default TodoList;
