import styled from '@emotion/styled';

interface PropsType {
  value?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Inputs = ({
  value,
  type = 'text',
  placeholder = '입력해주세요',
  label = '',
  onChange,
  ...props
}: PropsType) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputBox
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #222222;
  font-size: 16px;
  font-weight: 500;
`;
const InputBox = styled.input`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  background-color: #f6f6f6;
  font-size: 16px;
  font-weight: 400;

  &:focus {
    outline: none;
    border: 1px solid #cccccc;
    background-color: #f6f6f6;
  }
`;
