import { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // You will create this component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to not logged in

  // Router setup with login check
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* If the user is not logged in, redirect them to login */}
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
      </>
    )
  );

  return (
    <>
      {/* Provide the routes */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
