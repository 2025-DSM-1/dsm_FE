import styled from '@emotion/styled';
import { Header, Footer } from '../components';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  margin-top: 68px;
  width: 100vw;
`;

