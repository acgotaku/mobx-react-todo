import { useState, useCallback, useMemo, useEffect } from 'react';
import cls from 'clsx';
import { observer } from 'mobx-react-lite';
import { eventKey } from '@/constants/keyboard';
import { pluralize } from '@/utils/pluralize';
import { useStore } from '@/stores';
import TodoList from './TodoList';

const filters = ['all', 'active', 'completed'];

const TodoView = () => {
  const { todoList } = useStore();
  const [value, setValue] = useState('');
  const [visibility, setVisibility] = useState(
    window.location.hash.replace(/#\/?/, '')
  );
  const [finished, setFinished] = useState(todoList.activeTodos.length === 0);

  useEffect(() => {
    const onHashChange = () => {
      const filter = window.location.hash.replace(/#\/?/, '');
      if (filters.includes(filter)) {
        setVisibility(filter);
      } else {
        window.location.hash = '';
        setVisibility('all');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  useEffect(() => {
    todoList.toggleAll(finished);
  }, [finished, todoList]);

  const addTodo = useCallback(() => {
    const newTodoValue = value.trim();
    if (newTodoValue) {
      todoList.addTodo(newTodoValue);
      setValue('');
    }
  }, [todoList, value]);

  const keyDownInputHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case eventKey.Enter: {
          addTodo();
          break;
        }
      }
    },
    [addTodo]
  );

  const activeTodoWord = useMemo(
    () => pluralize(todoList.activeTodos.length, 'item'),
    [todoList.activeTodos.length]
  );

  const showClearButton = useMemo(
    () => todoList.completedTodos.length > 0,
    [todoList.completedTodos.length]
  );

  const filteredTodos = useMemo(() => {
    switch (visibility) {
      case 'all':
        return todoList.allTodos;
      case 'active':
        return todoList.activeTodos;
      case 'completed': {
        return todoList.completedTodos;
      }
      default: {
        return todoList.allTodos;
      }
    }
  }, [
    visibility,
    todoList.allTodos,
    todoList.activeTodos,
    todoList.completedTodos
  ]);

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            autoFocus
            autoComplete="off"
            placeholder="What needs to be done?"
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={keyDownInputHandler}
          />
        </header>
        {todoList.showTodo && (
          <>
            <section className="main">
              <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked={finished}
                onChange={event => setFinished(event.target.checked)}
              />
              <label htmlFor="toggle-all"></label>
              <TodoList todos={filteredTodos} />
            </section>
            <footer className="footer">
              <span className="todo-count">
                <strong>{todoList.activeTodos.length}</strong>
                {` ${activeTodoWord} left`}
              </span>
              <ul className="filters">
                <li>
                  <a
                    href="#/all"
                    className={cls({
                      selected: visibility == 'all'
                    })}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    href="#/active"
                    className={cls({
                      selected: visibility == 'active'
                    })}
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    href="#/completed"
                    className={cls({
                      selected: visibility == 'completed'
                    })}
                  >
                    Completed
                  </a>
                </li>
              </ul>
              {showClearButton && (
                <button
                  className="clear-completed"
                  onClick={todoList.removeCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Written by <a href="https://github.com/acgotaku">雪月秋水</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
};

export default observer(TodoView);
