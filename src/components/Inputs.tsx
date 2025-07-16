import { useState } from 'react';
import { Eyes } from '../assets';
import styled from '@emotion/styled';

interface IInputsType {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  width?: string;
  isPwd?: boolean;
  label?: string;
  onBlur?: () => void;
}

export const Inputs = ({
  value,
  onChange,
  placeholder = '입력해주세요',
  width = '100%',
  isPwd,
  label,
  onBlur,
}: IInputsType) => {
  const [isEye, setIsEye] = useState<boolean>(false);

  const eyeClick = () => {
    setIsEye(!isEye);
  };

  return (
    <InputContainer>
      <Label>{label}</Label>
      <EyesContainer width={width}>
        <Input
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          width={width}
          type={isEye ? 'password' : 'text'}
        />
        {isPwd && <Eyes onClick={eyeClick} isEye={isEye} />}
      </EyesContainer>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #222222;
  font-weight: 500;
`;

const Input = styled.input<{ width: string }>`
  width: ${({ width }) => width};
  height: 56px;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  padding: 16px;
  background-color: #f6f6f6;
  font-size: 16px;
  color: #171717;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #888888;
  }
`;

const EyesContainer = styled.div<Pick<IInputsType, 'width'>>`
  width: ${({ width }) => width};
  height: fit-content;
  position: relative;
`;
