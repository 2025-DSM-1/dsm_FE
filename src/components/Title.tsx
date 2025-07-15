import styled from '@emotion/styled';

interface ITitleType {
  mainTitle: string;
  subTitle: string;
}

export const Title = ({ mainTitle, subTitle }: ITitleType) => {
  return (
    <Container>
      <MainTitle>{mainTitle}</MainTitle>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #000000;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #888888;
`;
