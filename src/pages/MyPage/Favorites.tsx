import styled from "@emotion/styled"
import { LawTitleCard } from "./LawTitleCard"

export const Favorites = () => {
  return (
    <Container>
      <Title>회원정보 확인</Title>
      <Content>
        <LawTitleCard />
        <LawTitleCard />
        <LawTitleCard />
        <LawTitleCard />
        <LawTitleCard />
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
  padding: 40px 35px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px;
`;