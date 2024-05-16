import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { login } from '../redux/slices/authSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { username, password, userId: uuidv4() };
    dispatch(login(user));
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form onSubmit={handleSubmit} className="w-96 p-6 bg-black rounded">
        <div className="mb-4">
          <input
            id="username"
            type="text"
            placeholder="Логин"
            className="w-full px-3 py-2 mb-4 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none hover:border-gray-500 focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className="w-full px-3 py-2 mb-4 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none hover:border-gray-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 font-bold text-black bg-white rounded hover:bg-gray-300">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
