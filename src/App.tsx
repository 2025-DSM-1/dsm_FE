import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from './design-token';

export const App = () => {
  return (
    <div>
      <RouterProvider router={Router} />
      <GlobalStyle />
    </div>
  );
};
