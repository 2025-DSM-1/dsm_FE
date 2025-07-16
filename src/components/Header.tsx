import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigation = useNavigate();
  const [name, _] = useState<string>('박예빈');
  return (
    <HeaderContainer>
      <Logo onClick={() => navigation('main')}>KNOWLAW</Logo>
      <UserName onClick={() => navigation('mypage')}>{name} 님</UserName>
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
  font-size: 20px;
  font-weight: 900;
  color: #000000;
`;

const UserName = styled.div`
  font-size: 16px;
  color: #000000;
`;
