import React from 'react';
import { Todo } from '../redux/slices/todoSlice';

interface Props {
  todo: Todo;
  onToggleTodo: (todoId: string) => void;
  onRemoveTodo: (todoId: string) => void;
  userId: string;
}

const TodoWithTimer: React.FC<Props> = ({ todo, onToggleTodo, onRemoveTodo, userId }) => {
  const handleToggleTodo = () => {
    onToggleTodo(todo.id);
  };

  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <li className="flex flex-col p-2 mb-2 bg-gray-800 text-white rounded relative">
      <span
        onClick={handleToggleTodo}
        className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
      >
        {todo.text}
      </span>
      {todo.withTimer && (
        <p>
          {todo.startTime ? new Date(todo.startTime).toLocaleTimeString() : ''} - {formatTime(todo.elapsedTime)}
        </p>
      )}
      <button
        onClick={handleRemoveTodo}
        className="px-2 py-1 mt-1 text-sm font-bold text-red-500"
      >
        Remove
      </button>
    </li>
  );
};

export default TodoWithTimer;
