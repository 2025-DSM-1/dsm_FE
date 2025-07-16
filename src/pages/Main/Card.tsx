import styled from "@emotion/styled";
import { useState } from "react";
import Quote from "../../assets/Quote.png";
import { formatDate } from "../../hooks/formatDate";
import { useLawDetail } from "../../apis/Law";

interface BillCardProps {
  law: {
    lawId: number,
    lawTitle: string;
    lawContent: string;
    promulgationDate: string;
    resolutionResult: string;
    lawSerialNumber: number;
  };
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

export const BillCard = ({ law }: BillCardProps) => {
  // const { data } = useLawDetail(lawId);

  const [isFront, setIsFront] = useState<boolean>(true);

  const handleClick = () => {
    setIsFront(!isFront);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <CardInner isFront={isFront}>
        <CardFaceFront>
          <TitleSection>
            <QuoteIcon src={Quote} alt="Quote" />
            <LawTitleText>{law.lawTitle}</LawTitleText>
          </TitleSection>
          <BottomSection>
            <StatusTag>{data.lawStatus}</StatusTag>
            <DateLabel>{formatDate(data.propositionDate)}</DateLabel>
          </BottomSection>
        </CardFaceFront>

        <CardFaceBack>
          <CardHeader>
            <LabelText>의안번호</LabelText>
            <NumberText>{law.lawSerialNumber}</NumberText>
          </CardHeader>
          <DescriptionText>{law.lawContent}</DescriptionText>
        </CardFaceBack>
      </CardInner>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  perspective: 1000px;
  width: 368px;
  height: 266px;
  cursor: pointer;
`;

const CardInner = styled.div<{ isFront: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFront }) => (isFront ? "rotateY(0deg)" : "rotateY(180deg)")};
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardFaceFront = styled(CardFace)``;

const CardFaceBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

const QuoteIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const LabelText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #9c9c9c;
`;

const NumberText = styled.p`
  font-size: 26px;
  font-weight: 700;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
`;
