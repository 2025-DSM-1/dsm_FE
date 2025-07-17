import styled from '@emotion/styled';
import { Quote } from '../../assets';
import { useLawDetail } from '../../apis/Law';
import { formatDate } from '../../hooks/formatDate';
import { useDeleteFavoriteBill } from '../../apis/Favorite';

interface LawTitleCardProps {
  lawId: number;
  lawTitle: string;
}

export const LawTitleCard = ({ lawId, lawTitle }: LawTitleCardProps) => {
  const { data } = useLawDetail(lawId);
  const favoriteDelApi = useDeleteFavoriteBill(lawId);

  const delClick = () => {
    favoriteDelApi.mutate();
  };

  return (
    <CardContainer>
      <CardWrapper>
        <TitleSection>
          <QuoteIcon src={Quote} alt="Quote" />
          <LawTitleText>{lawTitle}</LawTitleText>
        </TitleSection>
        <BottomSection>
          <StatusTag>{data?.lawStatus}</StatusTag>
          {data?.propositionDate && (
            <DateLabel>{formatDate(data.propositionDate)}</DateLabel>
          )}
        </BottomSection>
      </CardWrapper>

      <ButtonWrapper>
        <Button>알림 받기</Button>
        <Line></Line>
        <Button onClick={delClick}>즐겨찾기 해제</Button>
      </ButtonWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(45, 47, 75, 0.1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }
  cursor: pointer;
`;

const CardWrapper = styled.div`
  width: 368px;
  height: 266px;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuoteIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const LawTitleText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const StatusTag = styled.span`
  background-color: #1d3055;
  color: #fff;
  padding: 6px 20px;
  border-radius: 30px;
  font-weight: 400;
  font-size: 16px;
`;

const DateLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #818181;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  flex: 1;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 10px;
  border-top: 1px solid #e3e3e3;
  font-size: 16px;
  font-weight: 500;
  background-color: #fcfcfc;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #e3e3e3;
`;
