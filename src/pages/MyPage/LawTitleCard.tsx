import styled from "@emotion/styled";
import { Quote } from "../../assets";
import { useLawDetail } from "../../apis/Law";
import { formatDate } from "../../hooks/formatDate";

interface LawTitleCardProps {
  lawId: number;
  lawTitle: string;
}

const data = {
  lawId: 2,
  lawTitle: "개인정보 보호법 일부개정법률안",
  lawSummaryContent: [
    { summaryElement: "개인정보의 자동 수집 범위를 명확히 정의한다." },
    { summaryElement: "이용자의 동의 없는 3자 제공 시 법적 제재를 강화한다." },
    { summaryElement: "개인정보 유출 시 플랫폼의 즉시 신고 의무를 부과한다." }
  ],
  lawStatus: "위원회 심사",
  propositionDate: "2024-04-15",
  backgroundInfo:
    "데이터 유출 사고가 빈번히 발생하면서 개인정보 보호에 대한 사회적 요구가 증가하고 있다. 특히 플랫폼 기업의 책임을 강화하자는 요구가 많아 법 개정이 추진되었다.",
  example:
    "예를 들어, SNS 기업이 수집한 위치정보를 이용자 동의 없이 광고업체에 제공한 사례가 논란이 되었고, 이를 규제하기 위한 조치이다."
}

export const LawTitleCard = ({ lawId, lawTitle }: LawTitleCardProps) => {
  // const { data } = useLawDetail(lawId);

  return (
    <CardContainer>
      <CardWrapper>
        <TitleSection>
          <QuoteIcon src={Quote} alt="Quote" />
          <LawTitleText>{lawTitle}</LawTitleText>
        </TitleSection>
        <BottomSection>
          <StatusTag>{data.lawStatus}</StatusTag>
          <DateLabel>{formatDate(data.propositionDate)}</DateLabel>
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

  &:hover {
  transform: translateY(-6px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  }
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

  &:hover {
    background-color: #f1f1f1;
  }
`

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #E3E3E3;
`