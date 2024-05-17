import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import TodoWithTimer from './TodoWithTimer';
import TodoInput from './TodoInput';
import { toggleTodo, removeTodo, completeTodo, completeTodoWithTimer } from '../redux/slices/todoSlice';
import type { Todo } from '../redux/slices/todoSlice';
import CurrentTodos from './CurrentTodos';
import CompletedTodos from './CompletedTodos';

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

  const handleCompleteTodo = (todoId: string) => {
    if (user) {
      dispatch(completeTodo({
        userId: user.userId,
        todoId: todoId, 
      }));
    }
  };

  const handleCompleteTodoWithTimer = (todoId: string) => {
    if (user) {
      dispatch(completeTodoWithTimer({
        userId: user.userId, // Передаем userId
        todoId: todoId, // Передаем todoId
      }));
    }
  };

  const currentTodos = todos.filter(todo => !todo.withTimer && !todo.completed);
  const activeTimerTodo = todos.find(todo => todo.withTimer && todo.currentlyWorking);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="flex flex-col w-full min-h-screen p-12 bg-black">
      <TodoInput />
      <hr className="w-full border-t border-light-grey" style={{ gridColumn: "1 / span 3" }} />
       <div className="py-12">{activeTimerTodo && (
        <TodoWithTimer
          key={activeTimerTodo.id}
          todo={activeTimerTodo}
          onCompleteWithTimer={handleCompleteTodoWithTimer} 
          userId={user?.userId || ''}
        />
      )}
      <CurrentTodos todos={currentTodos} toggleRemove={handleCompleteTodo} onComplete={handleCompleteTodo} />
      <CompletedTodos todos={completedTodos} toggleRemoveTodoWithTimer={handleCompleteTodoWithTimer} toggleRemoveTodo={handleCompleteTodo} /></div>
      
    </div>
  );
};

export default TodoList;
