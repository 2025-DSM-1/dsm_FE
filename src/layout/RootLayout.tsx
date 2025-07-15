import styled from '@emotion/styled';
import { Header } from '../components';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

const Main = styled.main`
  margin-top: 68px;
  width: 100vw;
`;
