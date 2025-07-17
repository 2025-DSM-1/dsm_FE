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

export const BillCard = ({ law }: BillCardProps) => {
  const { data } = useLawDetail(law.lawId);

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
            <StatusTag>{data?.lawStatus}</StatusTag>
            {data?.propositionDate && <DateLabel>{formatDate(data?.propositionDate)}</DateLabel>}
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
