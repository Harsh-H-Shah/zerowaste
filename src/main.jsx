import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
