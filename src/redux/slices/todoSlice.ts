import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  withTimer?: boolean;
  currentlyWorking?: boolean;
  startTime?: number | null; 
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
    incrementElapsedTime(
      state,
      action: PayloadAction<{ userId: string; todoId: string }>
    ) {
      const { userId, todoId } = action.payload;
      const todo = state[userId].find((t) => t.id === todoId);
      if (todo && todo.currentlyWorking) {
        todo.elapsedTime += 1000; 
      }
    },
    completeTodo(
      state,
      action: PayloadAction<{ userId: string; todoId: string }>
    ) {
      const { userId, todoId } = action.payload;
      const todo = state[userId].find((t) => t.id === todoId);
      if (todo) {
      todo.completed = true;
      }
    },
    completeTodoWithTimer(
      state,
      action: PayloadAction<{ userId: string; todoId: string }>
    ) {
      const { userId, todoId } = action.payload;
      const todo = state[userId].find((t) => t.id === todoId);
      if (todo) {
          todo.completed = true;
          todo.currentlyWorking = false;
      }
  },
  },
});

export const { addTodo, toggleTodo, removeTodo, incrementElapsedTime, completeTodo, completeTodoWithTimer } = todosSlice.actions;
export default todosSlice.reducer;
