import React, { useCallback, useState } from 'react';
import cls from 'clsx';
import { useStore } from '@/stores';
import { eventKey } from '@/constants/keyboard';
import { TodoItem as ITodoItem } from '@/stores/todoItem';

interface ITodoItemProps {
  todo: ITodoItem;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const { todoList } = useStore();
  const [isEditing, setEdit] = useState(false);
  const [newText, setText] = useState(todo.title);

  const removeTodo = useCallback(() => {
    todoList.removeTodo(todo);
  }, [todo, todoList]);

  const handleSubmit = useCallback(() => {
    todo.updateTitle(newText);
    setEdit(false);
  }, [todo, newText]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case eventKey.Escape: {
          setText(todo.title);
          setEdit(false);
          break;
        }

        case eventKey.Enter: {
          handleSubmit();
          break;
        }
      }
    },
    [handleSubmit, todo.title]
  );

  return (
    <li
      className={cls({
        completed: todo.completed,
        editing: isEditing
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={event => todo.updateCompleted(event.target.checked)}
        />
        <label onDoubleClick={() => setEdit(true)}>{todo.title}</label>
        <button className="destroy" onClick={removeTodo}></button>
      </div>
      <input
        className="edit"
        type="text"
        value={newText}
        onBlur={handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};

export default TodoItem;
