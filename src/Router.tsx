import { createBrowserRouter } from 'react-router-dom';
import { Login, SignUp, CardDetail, BillList } from './pages';
import { RootLayout } from './layout';
import { Procedure } from './components';

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
  {
    path: '/bill',
    element: <RootLayout />,
    children: [
      {
        path: 'detail',
        element: <CardDetail />,
      },
      {
        path: 'list',
        element: <BillList />,
      },
    ],
  },
]);
