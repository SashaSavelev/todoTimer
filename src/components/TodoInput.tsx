import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Todo, addTodo, incrementElapsedTime } from '../redux/slices/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { Popup } from './Popup';

const TodoInput: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => (user ? state.todos[user.userId] : []));

  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddTodo = () => {
    if (user && todoText.trim()) {
      const newTodo: Todo = {
        id: uuidv4(),
        text: todoText,
        completed: false,
        withTimer: false,
        currentlyWorking: false,
        startTime: null,
        elapsedTime: 0,
      };
      dispatch(addTodo({ userId: user.userId, todo: newTodo }));
      setTodoText('');
    }
  };

  const handlePlay = () => {
    if (user && todoText.trim()) {
      const hasActiveTimer = todos ? todos.some((todo) => todo.withTimer && todo.currentlyWorking) : false;
      if (!hasActiveTimer) {
        const newTodo: Todo = {
          id: uuidv4(),
          text: todoText,
          completed: false,
          withTimer: true,
          currentlyWorking: true,
          startTime: Date.now(),
          elapsedTime: 0,
        };
        dispatch(addTodo({ userId: user.userId, todo: newTodo }));
        dispatch(incrementElapsedTime({ userId: user.userId, todoId: newTodo.id }));
      } else {
        setShowPopup(true);       
      }
      setTodoText('');
    }
  };

  return (
    <div className="flex items-center mb-4 w-full">
      <div className="flex items-center bg-dark-grey rounded flex-grow">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="flex-grow px-3 py-2 mr-2 text-white bg-dark-grey border-none rounded focus:outline-none"
          placeholder=""
        />
        <button
          onClick={handleAddTodo}
          className="flex items-center justify-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 group"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors duration-300 ease-in-out"
          >
            <path
              d="M11 7.33331V14.6666M7.33334 11H14.6667M20.1667 11C20.1667 16.0626 16.0626 20.1666 11 20.1666C5.9374 20.1666 1.83334 16.0626 1.83334 11C1.83334 5.93737 5.9374 1.83331 11 1.83331C16.0626 1.83331 20.1667 5.93737 20.1667 11Z"
              stroke="#7A7A7A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors duration-300 ease-in-out"
            />
          </svg>
        </button>
      </div>
      <button
        onClick={handlePlay}
        className="flex items-center justify-center px-4 py-2 font-bold text-white ml-2 group"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors duration-300 ease-in-out"
        >
          <path
            d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
            stroke="#7A7A7A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-white transition-colors duration-300 ease-in-out"
          />
          <path
            d="M8.5 7.96533C8.5 7.48805 8.5 7.24941 8.59974 7.11618C8.68666 7.00007 8.81971 6.92744 8.96438 6.9171C9.13038 6.90525 9.33112 7.03429 9.73261 7.29239L14.4532 10.3271C14.8016 10.551 14.9758 10.663 15.0359 10.8054C15.0885 10.9298 15.0885 11.0702 15.0359 11.1946C14.9758 11.337 14.8016 11.449 14.4532 11.6729L9.73261 14.7076C9.33112 14.9657 9.13038 15.0948 8.96438 15.0829C8.81971 15.0726 8.68666 14.9999 8.59974 14.8838C8.5 14.7506 8.5 14.512 8.5 14.0347V7.96533Z"
            stroke="#7A7A7A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-white transition-colors duration-300 ease-in-out"
          />
        </svg>
      </button>
      {showPopup && <Popup message="Сначала завершите текущую задачу" onClose={handleClosePopup} />}
    </div>
  );
};

export default TodoInput;
