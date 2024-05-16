import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import TodoWithTimer from './TodoWithTimer';
import TodoInput from './TodoInput'; // Импортируем TodoInput
import { toggleTodo, removeTodo } from '../redux/slices/todoSlice';
import type { Todo } from '../redux/slices/todoSlice';

const TodoList: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => user ? state.todos[user.userId] : []);
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

  // Функция сортировки, которая перемещает todo с таймером в начало массива
  const sortByTimer = (a: Todo, b: Todo) => {
    if (a.withTimer && !b.withTimer) {
      return -1;
    }
    if (!a.withTimer && b.withTimer) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-4 bg-black">
      <TodoInput /> {/* Добавляем TodoInput */}
      <ul className="list-none p-0">
        {todos && todos.length > 0 && todos
          .slice()
          .sort(sortByTimer)
          .map(todo => (
            <TodoWithTimer
              key={todo.id}
              userId={user?.userId || ''}
              todo={todo}
              onToggleTodo={handleToggleTodo}
              onRemoveTodo={handleRemoveTodo}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
