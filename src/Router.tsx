import { createBrowserRouter } from 'react-router-dom';
import { Login, SignUp } from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <div>Root</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);
