// Todo.tsx

import React from 'react';
import { Todo } from '../redux/slices/todoSlice';

interface Props {
  todo: Todo;
  onToggleTodo: (todoId: string) => void;
  onRemoveTodo: (todoId: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggleTodo, onRemoveTodo }) => {
  return (
    <li className="flex justify-between p-2 mb-2 bg-gray-800 text-white rounded">
      <span
        onClick={() => onToggleTodo(todo.id)}
        className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onRemoveTodo(todo.id)}
        className="px-2 py-1 text-sm font-bold text-red-500"
      >
        Remove
      </button>
    </li>
  );
};

export default TodoItem;
