import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  withTimer?: boolean;
  currentlyWorking?: boolean;
  startTime?: number | null; // Изменяем тип данных на number для хранения timestamp
  elapsedTime: number;
}

interface TodosState {
  [key: string]: Todo[];
}

const initialState: TodosState = {};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(
      state,
      action: PayloadAction<{ userId: string; todo: Todo }>
    ) {
      const { userId, todo } = action.payload;
      if (!state[userId]) {
        state[userId] = [];
      }
      state[userId].push(todo);
    },
    toggleTodo(
      state,
      action: PayloadAction<{ userId: string; todoId: string }>
    ) {
      const { userId, todoId } = action.payload;
      const todos = state[userId];
      const todo = todos.find((t) => t.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(
      state,
      action: PayloadAction<{ userId: string; todoId: string }>
    ) {
      const { userId, todoId } = action.payload;
      state[userId] = state[userId].filter((t) => t.id !== todoId);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
