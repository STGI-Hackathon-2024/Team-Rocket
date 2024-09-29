import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder login logic; replace with actual authentication
    if (username === 'admin' && password === 'password') {
      onLogin(username); // Pass the username to the parent component
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='bg-gradient-to-r from-gray-800 to-black flex justify-center h-screen items-center'>
      <div className='w-full max-w-md'>
        <form className='flex flex-col rounded-xl gap-4 p-8 bg-gradient-to-r from-white to-gray-300 shadow-lg transition-transform transform hover:scale-105 duration-300' onSubmit={handleLogin}>
          <h1 className='text-center font-bold text-3xl text-gray-800'>Login</h1>
          <div className='flex flex-col'>
            <label className='font-semibold text-gray-700' htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-4 py-2 rounded-lg text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold text-gray-700' htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 rounded-lg text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className='text-sm text-gray-700'>Show Password</label>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <button
              type="submit"
              className='mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-6 rounded-xl shadow-lg hover:bg-blue-500 transition duration-300'
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
