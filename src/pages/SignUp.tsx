import styled from '@emotion/styled';
import { authImg } from '../assets';
import { Button, Inputs, Title } from '../components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCheckEmailDuplicate,
  useSendAuthCode,
  useVerifyAuthCode,
} from '../apis/Email';
import { useSignUp } from '../apis/Auth';

export const SignUp = () => {
  const emailCheckApi = useCheckEmailDuplicate();
  const codeApi = useSendAuthCode();
  const verifyAuthCodeApi = useVerifyAuthCode();
  const signUpApi = useSignUp();

  const navigate = useNavigate();
  const [datas, setDatas] = useState({
    name: '',
    email: '',
    code: '',
    password: '',
  });
  const [delayTime, setDelayTime] = useState<number>(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [pwdDatas, setPwdDatas] = useState({
    password: '',
    checkPassword: '',
  });

  const handleSignUpClick = () => {
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해 주세요.');
      return;
    }
    signUpApi.mutate({
      name: datas.name,
      email: datas.email,
      password: datas.password,
    });
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, code: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdDatas((prev) => ({ ...prev, password: e.target.value }));
  };

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPwdDatas((prev) => ({ ...prev, checkPassword: e.target.value }));
  };

  const handleCodeClick = () => {
    emailCheckApi.mutate(
      { email: datas.email },
      {
        onSuccess: () => {
          codeApi.mutate(
            { email: datas.email },
            {
              onSuccess: () => {
                alert('인증번호가 발송되었습니다.');
                let time = 150;
                setDelayTime(time);
                setIsEmailVerified(false);

                if (timerRef.current) {
                  clearInterval(timerRef.current);
                }

                timerRef.current = setInterval(() => {
                  setDelayTime((prev) => {
                    if (prev <= 1 && timerRef.current) {
                      clearInterval(timerRef.current);
                      return 0;
                    }
                    return prev - 1;
                  });
                }, 1000);
              },
            }
          );
        },
        onError: (error) => {
          console.error(error.message);
        },
      }
    );
  };

  const handleCodeBlur = () => {
    verifyAuthCodeApi.mutate(
      { email: datas.email, authCode: datas.code },
      {
        onSuccess: () => {
          setIsEmailVerified(true);
          alert('이메일 인증이 완료되었습니다.');
        },
        onError: () => {
          setIsEmailVerified(false);
          alert('인증번호가 올바르지 않습니다.');
        },
      }
    );
  };

  useEffect(() => {
    if (pwdDatas.password && pwdDatas.checkPassword) {
      if (pwdDatas.password === pwdDatas.checkPassword) {
        setDatas((prev) => ({ ...prev, password: pwdDatas.password }));
      } else {
        const timer = setTimeout(() => {
          alert('비밀번호가 일치하지 않습니다.');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [pwdDatas.password, pwdDatas.checkPassword]);

  return (
    <AllContainer>
      <SignUpAllContainer>
        <MainContainer>
          <Title
            mainTitle="회원가입"
            subTitle="회원가입 하여 서비스를 이용해 보세요."
          />
          <SubContainer>
            <Inputs
              value={datas.name}
              onChange={handleNameChange}
              placeholder="이름을 입력해 주세요."
              label="이름"
            />
            <SubInputContainer>
              <EmailContainer>
                <Inputs
                  width="auto"
                  value={datas.email}
                  onChange={handleEmailChange}
                  placeholder="이메일을 입력해 주세요."
                  label="이메일"
                />
                <Button onClick={handleCodeClick}>인증번호 받기</Button>
              </EmailContainer>
              <DelayContainer>
                <Inputs
                  onBlur={handleCodeBlur}
                  value={datas.code}
                  onChange={handleCodeChange}
                  placeholder="인증코드를 입력해주세요."
                />
                {!isEmailVerified && (
                  <DelayText>
                    대기 시간 : {Math.floor(delayTime / 60)}분{' '}
                    {String(delayTime % 60).padStart(2, '0')}초
                  </DelayText>
                )}
              </DelayContainer>
            </SubInputContainer>
            <SubInputContainer>
              <Inputs
                value={pwdDatas.password}
                onChange={handlePasswordChange}
                placeholder="비밀번호를 입력해 주세요."
                label="비밀번호"
                isPwd={true}
              />
              <Inputs
                value={pwdDatas.checkPassword}
                onChange={handlePasswordCheckChange}
                placeholder="입력한 비밀번호를 확인하세요."
                isPwd={true}
              />
            </SubInputContainer>
          </SubContainer>
          <SubContainer style={{ alignItems: 'center' }}>
            <Button onClick={handleSignUpClick} width="100%">
              회원가입
            </Button>
            <SubNavContainer>
              <SubNavTitle>이미 회원이신가요?</SubNavTitle>
              <SubNav onClick={handleLoginClick}>로그인</SubNav>
            </SubNavContainer>
          </SubContainer>
        </MainContainer>
      </SignUpAllContainer>
      <Img src={authImg} alt="imgbanner" />
    </AllContainer>
  );
};

const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 8px;
`;

const SignUpAllContainer = styled.div`
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

const SubInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DelayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DelayText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #9e9e9e;
`;
