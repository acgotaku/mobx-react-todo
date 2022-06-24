import { TodoItem as ITodoItem } from '@/stores/todoItem';

interface ITodoItemProps {
  todo: ITodoItem;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  return (
    <li className="todo">
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={todo.toggleCompleted}
          defaultChecked={todo.completed}
        />
        <label>{todo.title}</label>
        <button className="destroy"></button>
      </div>
      <input className="edit" type="text" />
    </li>
  );
};

export default TodoItem;
