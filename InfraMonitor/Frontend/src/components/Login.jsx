import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder login logic; replace with actual authentication
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='bg-gradient-to-tr from-zinc-900 to-gray-700 flex justify-center h-screen items-center'>
      <div className='flex w-[70%] justify-center '>
        <form className=' flex flex-col rounded-xl gap-3 px-16 pb-4 bg-gradient-to-r from-zinc-200 to-stone-300' onSubmit={handleLogin}>
          <h1 className='text-center font-bold text-4xl p-4 pt-6'>Login</h1>
          <div className='flex flex-col'>
            <label className='font-semibold' htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-2 py-1 rounded text-black bg-transparent border border-gray-600"
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold' htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-2 py-1 rounded text-black bg-transparent border border-gray-600"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} // Toggle visibility
                className="mr-2"
              />
              <label htmlFor="showPassword" className='text-sm'>Show Password</label>
            </div>
          </div>
          <div className='flex justify-center items-center pb-4'>
            <button
              type="submit"
              className='mt-4 bg-gradient-to-tr from-zinc-900 to-gray-700 font-semibold  text-white p-2 rounded-xl hover:bg-gray-200 px-6'>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
