import styled from "@emotion/styled";
import { Inputs } from "../../components";
import { useState } from "react";

export const UserInformation = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailConsent, setEmailConsent] = useState<boolean>(false);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
      };

  const inputData = [
    {
      value: name,
      label: "이름",
      onChange: handleChange(setName),
    },
    {
      value: email,
      label: "이메일",
      onChange: handleChange(setEmail),
    },
    {
      value: password,
      label: "비밀번호",
      onChange: handleChange(setPassword),
      isPwd: true,
    },
  ];

  return (
    <Container>
      <Title>회원정보 확인</Title>
      <Content>
        <InputSection>
          {inputData.map((input, idx) => (
            <Inputs
              key={idx}
              value={input.value}
              label={input.label}
              onChange={input.onChange}
              isPwd={input.isPwd}
            />
          ))}
          <EmailConsentRow>
            <EmailConsentText>이메일 수신 동의</EmailConsentText>
            <ToggleSwitch
              isOn={emailConsent}
              onClick={() => setEmailConsent(!emailConsent)}
            >
              <ToggleCircle isOn={emailConsent} />
            </ToggleSwitch>
          </EmailConsentRow>
        </InputSection>

        <DeleteAccountButton>회원탈퇴</DeleteAccountButton>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  padding: 16px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #EAEAEA;
  font-size: 24px;
  font-weight: 600;
`

const Content = styled.div`
  padding: 40px 20px 200px;
  display: flex;
  justify-content: space-between;
`

const InputSection = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 17px;
`

const EmailConsentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const EmailConsentText = styled.p`
  font-size: 16px;
  font-weight: 500;
`

const ToggleSwitch = styled.div<{ isOn: boolean }>`
  width: 64px;
  height: 28px;
  background-color: ${({ isOn }) => (isOn ? "#1D3055" : "#E0E0E0")};
  border-radius: 64px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const ToggleCircle = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: ${({ isOn }) => (isOn ? "38px" : "6px")};
  transition: left 0.2s ease;
`;

const DeleteAccountButton = styled.button`
  max-width: fit-content;
  max-height: fit-content;
  padding: 12px 28px;
  border-radius: 8px;
  background-color: #1D3055;
  color: #fff;
`