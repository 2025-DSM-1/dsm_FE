import styled from '@emotion/styled';
import { authImg } from '../assets';
import { Button, Inputs, Title } from '../components';

export const Login = () => {
  return (
    <AllContainer>
      <LoginAllContainer>
        <MainContainer>
          <Title
            mainTitle="로그인"
            subTitle="로그인 하여 서비스를 이용해 보세요."
          />
          <SubContainer>
            <Inputs placeholder="이메일을 입력해 주세요." label="이메일" />
            <Inputs
              placeholder="비밀번호를 입력해 주세요."
              label="비밀번호"
              isPwd={true}
            />
          </SubContainer>
          <SubContainer style={{ alignItems: 'center' }}>
            <Button width="100%">로그인</Button>
            <SubNavContainer>
              <SubNavTitle>아직 회원이 아니신가요?</SubNavTitle>
              <SubNav>회원가입</SubNav>
            </SubNavContainer>
          </SubContainer>
        </MainContainer>
      </LoginAllContainer>
      <Img src={authImg} alt="imgbanner" />
    </AllContainer>
  );
};

const LoginAllContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Img = styled.img`
  height: 100vh;
`;

const AllContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  width: 400px;
`;

const SubNavContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const SubNavTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #888888;
`;

const SubNav = styled.div`
  font-size: 16px;
  color: #2a67e1;
  cursor: pointer;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;
