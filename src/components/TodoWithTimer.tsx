import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../redux/slices/todoSlice';
import { incrementElapsedTime } from '../redux/slices/todoSlice';

interface Props {
  todo: Todo;
  onToggleTodo: (todoId: string) => void;
  onRemoveTodo: (todoId: string) => void;
  userId: string;
}

const TodoWithTimer: React.FC<Props> = ({ todo, onToggleTodo, onRemoveTodo, userId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (todo.withTimer && todo.currentlyWorking) {
      interval = setInterval(() => {
        dispatch(incrementElapsedTime({ userId, todoId: todo.id }));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, userId, todo]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleToggleTodo = () => {
    onToggleTodo(todo.id);
  };

  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const startTime = todo.startTime;
  const elapsedTime = startTime ? Math.floor((currentTime - startTime) / 1000) : 0;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const elapsedTimeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentTimeFormatted = new Date(currentTime).toLocaleTimeString();
  const startTimeFormatted = startTime ? new Date(startTime).toLocaleTimeString() : '';

  return (
<div className="flex flex-col">
  <table className="border-collapse border border-gray-400">  
    <tbody>
      <tr>
        <td className="border border-gray-400 px-4 py-2 w-1/2 text-white">{todo.text}</td>
        <td className="border border-gray-400 px-4 py-2 w-1/5 text-center text-white">
          {startTimeFormatted.substr(0, 5)} - {currentTimeFormatted.substr(0, 5)}
        </td>
        <td className="border border-gray-400 px-4 py-2 w-1/5 text-right text-blue">{elapsedTimeFormatted}</td>
      </tr>
    </tbody>
  </table>
</div>


    
  );
};

export default TodoWithTimer;
