import styled from '@emotion/styled';

interface IButtonType {
  children: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  width?: string;
  borderColor?: string;
  onClick: () => void;
  isBlocked?: boolean;
}

export const Button = ({
  width = 'fit-content',
  children,
  backgroundColor = '#1D3055',
  borderColor,
  color = '#ffffff',
  onClick,
  isBlocked,
}: IButtonType) => {
  return (
    <ButtonContainer
      isBlocked={isBlocked}
      onClick={onClick}
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
  opacity: ${({ isBlocked }) => (isBlocked ? 0.5 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
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
  cursor: pointer;
`;
