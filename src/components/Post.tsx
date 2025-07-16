import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface IPostType {
  title: string;
  content: string;
  promulgationDate: string;
  enforcementDate: string;
  status: string;
  onClick: () => void;
}

type IStatusType = {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  children: string;
};

const Status = ({
  color = '#0290F4',
  backgroundColor = 'rgba(197, 237, 255, 0.37)',
  borderColor = '#0DAAFF',
  children,
}: IStatusType) => {
  return (
    <StatusContainer
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {children}
    </StatusContainer>
  );
};

export const Post = ({
  title,
  onClick,
  content,
  promulgationDate,
  enforcementDate,
  status,
}: IPostType) => {
  const [colorDatas, setColorDatas] = useState<{
    borderColor: string;
    color: string;
    backgroundColor: string;
  }>({
    borderColor: '#1D3055',
    color: '#1D3055',
    backgroundColor: '#E6EAF2',
  });
  useEffect(() => {
    if (status === '시행') {
      setColorDatas({
        borderColor: '#1D3055',
        color: '#ffffff',
        backgroundColor: '#1D3055',
      });
    } else if (status === '접수') {
      setColorDatas({
        borderColor: '#1D3055',
        color: '#1D3055',
        backgroundColor: '#ffffff',
      });
    }
  }, [status]);
  return (
    <Container onClick={onClick}>
      <TitleContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </TitleContainer>
      <Date>{promulgationDate}</Date>
      <Date>{enforcementDate}</Date>
      <Status
        color={colorDatas.color}
        borderColor={colorDatas.borderColor}
        backgroundColor={colorDatas.backgroundColor}
      >
        {status}
      </Status>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 88px;
  padding: 20px 24px;
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  flex: 0 0 48rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Date = styled.div`
  font-size: 16px;
  font-weight: 400;
  flex: 0 0 9.5rem;
`;

const Title = styled.div`
  font-size: 18px;
`;

const Content = styled.div`
  font-size: 16px;
  color: #c5c5c5;
`;

const StatusContainer = styled.div<Omit<IStatusType, 'children'>>`
  flex: 0 0 4.4rem;
  padding: 6px 20px;
  border-radius: 30px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;
