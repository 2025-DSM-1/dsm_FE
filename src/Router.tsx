import { createBrowserRouter } from 'react-router-dom';
import {
  Login,
  SignUp,
  CardDetail,
  BillList,
  Main,
  MyPage,
  Quiz,
} from './pages';
import { RootLayout } from './layout';

export const Router = createBrowserRouter([
  {
    path: '/',
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
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'myPage',
        element: <MyPage />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
    ],
  },
]);
