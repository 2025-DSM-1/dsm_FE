import styled from '@emotion/styled';
import { LawTitleCard } from './LawTitleCard';
import { useGetFavoriteList } from '../../apis/Favorite';

export interface FavoriteLaw {
  lawId: number;
  lawTitle: string;
}

export interface FavoriteLawResponse {
  laws: FavoriteLaw[];
}

export const Favorites = () => {
  const { data }: { data?: FavoriteLawResponse } = useGetFavoriteList();
  // const { mutate: deleteFavorite } = useDeleteFavoriteBill();

  return (
    <Container>
      <Title>즐겨찾기한 법안</Title>
      <Content>
        {data?.laws.length ? (
          data.laws.map((law) => (
            <LawTitleCard
              key={law.lawId}
              lawId={law.lawId}
              lawTitle={law.lawTitle}
            />
          ))
        ) : (
          <EmptyMessage>즐겨찾기한 법안이 없습니다.</EmptyMessage>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  padding: 16px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #eaeaea;
  font-size: 24px;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 40px 35px 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 35px;
`;

const EmptyMessage = styled.p``;
