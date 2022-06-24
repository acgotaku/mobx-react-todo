import React from 'react';
import todoList, { TodoList } from './todoList';

export type RootStore = {
  todoList: TodoList;
};

export const store: RootStore = {
  todoList
};

const StoreContext = React.createContext<RootStore>(store);

export const StoreProvider = StoreContext.Provider;

export const useStore = () => React.useContext(StoreContext);
