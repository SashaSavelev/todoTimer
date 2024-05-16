import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Todo, addTodo } from '../redux/slices/todoSlice';
import { v4 as uuidv4 } from 'uuid';

const TodoInput: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');

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
      
     
    }
  };

  return (
    <div className="flex mb-4 w-full">
    <div className="flex items-center mb-2 flex-grow">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="flex-grow px-3 py-2 mr-2 text-black bg-gray-200 border border-gray-400 rounded focus:outline-none focus:border-blue-500"
        placeholder="New Todo"
      />
      <button onClick={handleAddTodo} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        +
      </button>
    </div>
    <button onClick={handlePlay} className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700 ml-2">
      Play
    </button>
  </div>
  
  );
};

export default TodoInput;
