import { createBrowserRouter } from 'react-router-dom';
import { Login } from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <div>Root</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
