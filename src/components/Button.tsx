import styled from '@emotion/styled';

interface IButtonType {
  children: string;
  backgroundColor?: string;
  color?: string;
  width?: string;
  borderColor?: string;
}

export const Button = ({
  width = 'fit-content',
  children,
  backgroundColor = '#1D3055',
  borderColor,
  color = '#ffffff',
}: IButtonType) => {
  return (
    <ButtonContainer
      borderColor={borderColor}
      width={width}
      color={color}
      backgroundColor={backgroundColor}
    >
      {children}
    </ButtonContainer>
  );
};
const ButtonContainer = styled.button<Omit<IButtonType, 'children'>>`
  width: ${({ width }) => width};
  height: 56px;
  padding: 16px 24px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid
    ${({ borderColor }) => (borderColor ? borderColor : 'transparent')};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
`;
