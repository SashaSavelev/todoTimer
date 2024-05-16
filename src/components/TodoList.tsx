import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Todo } from '../redux/slices/todoSlice';
import TodoInput from './TodoInput';
import TodoWithTimer from './TodoWithTimer';
import { toggleTodo, removeTodo } from '../redux/slices/todoSlice';

const TodoList: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => state.todos[user?.userId || ''] || []);
  const dispatch = useDispatch();

  const handleToggleTodo = (todoId: string) => {
    if (user) {
      dispatch(toggleTodo({ userId: user.userId, todoId }));
    }
  };

  const handleRemoveTodo = (todoId: string) => {
    if (user) {
      dispatch(removeTodo({ userId: user.userId, todoId }));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black">
      <div className="w-screen px-4 py-10 md:w-4/5 flex flex-col items-center justify-center">
        <TodoInput />
        <ul className="w-full max-w-md">
          {todos.map(todo => (
            <TodoWithTimer
              key={todo.id}
              userId={user?.userId || ''}
              todo={todo}
              onToggleTodo={handleToggleTodo}
              onRemoveTodo={handleRemoveTodo}
            />
          ))}
        </ul>
        {user && <p className="mt-4 mb-4">Logged in as: {user.username}</p>}
      </div>
    </div>
  );
};

export default TodoList;
