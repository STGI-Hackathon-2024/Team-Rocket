import { useState, useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // State to store username

  // Load the login state from localStorage when the app starts
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username'); // Get the stored username
    if (storedLoginState === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername); // Set the username from localStorage
    }
  }, []);

  // Handler for login
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user); // Set the logged-in username
    localStorage.setItem('isLoggedIn', 'true'); // Save login state
    localStorage.setItem('username', user); // Save username in localStorage
  };

  // Handler for logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(''); // Clear the username
    localStorage.setItem('isLoggedIn', 'false'); // Clear login state
    localStorage.removeItem('username'); // Clear the username from localStorage
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard username={username} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
