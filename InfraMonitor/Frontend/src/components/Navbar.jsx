import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ username, onLogout }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className='w-[70%] flex justify-between'>
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-300 via-slate-200 to-amber-200">
          Dashboard
        </div>
        <div className="flex items-center">
          <Link to="/" className="mx-4 text-lg text-gray-500 hover:text-gray-300">Home</Link>
          <Link to="/settings" className="mx-4 text-lg text-gray-500 hover:text-gray-300">Settings</Link>
          <span className="text-lg text-gray-500">Welcome, {username ? username : "Admin"}!</span>
          <button
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
