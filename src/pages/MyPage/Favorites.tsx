import styled from "@emotion/styled"
import { LawTitleCard } from "./LawTitleCard"
import { useDeleteFavoriteBill, useGetFavoriteList } from "../../apis/Favorite";

const favoriteLaws = [
  { lawId: 1, lawTitle: "청소년 보호법 일부개정법률안" },
  { lawId: 2, lawTitle: "개인정보 보호법 전부개정법률안" },
  { lawId: 3, lawTitle: "전자상거래법 개정안" },
];

export const Favorites = () => {
  return (
    <Container>
      <Title>회원정보 확인</Title>
      <Content>
        {favoriteLaws.map((law) => (
          <LawTitleCard key={law.lawId} lawId={law.lawId} lawTitle={law.lawTitle} />
        ))}
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
  padding: 40px 35px 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px;
`;