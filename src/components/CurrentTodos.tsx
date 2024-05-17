import React from 'react';
import { Todo } from '../redux/slices/todoSlice';

interface Props {
  todos: Todo[];
  toggleRemove: (todoId: string) => void;
}

const CurrentTodos: React.FC<Props> = ({ todos = [], toggleRemove }) => {
  
  const filteredTodos = todos.filter(
    (todo) => !todo.withTimer && !todo.completed
  );

  return (
    <div className="flex flex-col">
      <table className="border-collapse border border-gray-400">
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id}>
              <td className="border border-gray-400 px-4 py-2 text-white">{todo.text}</td>
              <td className="border border-gray-400 px-4 py-2 text-white"></td>
              <td className="border border-gray-400 px-4 py-2 text-white">
                <button onClick={() => toggleRemove(todo.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentTodos;
