import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import TodoWithTimer from './TodoWithTimer';
import TodoInput from './TodoInput';
import { toggleTodo, removeTodo } from '../redux/slices/todoSlice';
import type { Todo } from '../redux/slices/todoSlice';
import CurrentTodos from './CurrentTodos';

const TodoList: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => (user ? state.todos[user.userId] : []) || []);
  const dispatch = useDispatch();

  const handleToggleTodo = (todoId: string) => {
    if (user) {
      dispatch(toggleTodo({
        userId: user.userId,
        todoId,
      }));
    }
  };

  const handleRemoveTodo = (todoId: string) => {
    if (user) {
      dispatch(removeTodo({
        userId: user.userId,
        todoId,
      }));
    }
  };

  // Filter todos for current and active timer todos
  const currentTodos = todos.filter(todo => !todo.withTimer && !todo.completed);
  const activeTimerTodo = todos.find(todo => todo.withTimer && todo.currentlyWorking);

  return (
    <div className="flex flex-col w-full min-h-screen p-8 bg-black">
      <TodoInput /> 
      {activeTimerTodo && (
        <TodoWithTimer
          key={activeTimerTodo.id}
          todo={activeTimerTodo}
          onToggleTodo={handleToggleTodo}
          onRemoveTodo={handleRemoveTodo}
          userId={user?.userId || ''}
        />
      )}
      <CurrentTodos todos={currentTodos} toggleRemove={handleRemoveTodo} />
    </div>
  );
};

export default TodoList;
