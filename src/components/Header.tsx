import styled from '@emotion/styled';
import { useState } from 'react';

export const Header = () => {
  const [name, _] = useState<string>('박예빈');
  return (
    <HeaderContainer>
      <Logo>KNOWLAW</Logo>
      <UserName>{name} 님</UserName>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 68px;
  display: flex;
  justify-content: space-between;
  padding: 0 140px;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;

const UserName = styled.div`
  font-size: 16px;
  color: #000000;
`;
