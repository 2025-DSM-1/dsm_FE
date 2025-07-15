import styled from "@emotion/styled";
import { Quote } from "../../assets";

export const LawTitleCard = () => {
  return (
    <CardContainer>
      <CardWrapper>
        <TitleSection>
          <QuoteIcon src={Quote} alt="Quote" />
          <LawTitleText>방송 3법 개정안</LawTitleText>
        </TitleSection>
        <BottomSection>
          <StatusTag>시행</StatusTag>
          <DateLabel>2025년 7월 11일</DateLabel>
        </BottomSection>
      </CardWrapper>

      <ButtonWrapper>
        <Button>알림 받기</Button>
        <Line></Line>
        <Button>즐겨찾기 해제</Button>
      </ButtonWrapper>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(45, 47, 75, 0.1);
  cursor: pointer;
`

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
  background-color: #1D3055;
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
`

const Button = styled.button`
  flex: 1;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 10px;
  border-top: 1px solid #E3E3E3;
  font-size: 16px;
  font-weight: 500;
  background-color: #FCFCFC;
`

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #E3E3E3;
`