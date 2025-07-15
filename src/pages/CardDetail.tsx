import styled from '@emotion/styled';
import { useState } from 'react';
import { banner, Star } from '../assets';

export const CardDetail = () => {
  const [datas, setDatas] = useState<{
    lawId: number;
    lawTitle: string;
    lawSummaryContent: string;
    lawStatus: string;
    propositionDate: string;
    backgroundInfo: string;
    example: string;
  }>({
    lawId: 1,
    lawTitle: '청소년 보호법 일부개정법률안',
    lawSummaryContent:
      '청소년 유해 매체물의 범위를 확대하고, 관련 규제를 강화한다.',
    lawStatus: '발의',
    propositionDate: '2024-05-05',
    backgroundInfo:
      '최근 온라인 플랫폼을 통해 청소년에게 노출되는 유해 매체물의 범위가 다양해지고 있는 상황에서, 기존 법령이 이를 충분히 규제하지 못한다는 지적이 제기되었다. 이에 따라 법적 정의를 확장하고, 실효성 있는 제재 수단을 마련하고자 개정이 추진되었다.',
    example:
      '예를 들어, BJ의 음란 방송이나 자극적인 숏폼 콘텐츠 등이 청소년에게 쉽게 노출되고 있으나 현재 법령으로는 이를 제재하기 어렵다. 개정안은 이를 유해 매체물로 명확히 규정하고, 플랫폼 사업자에게 필터링 의무를 부과하도록 하고 있다.',
  });
  return (
    <div>
      <Banner src={banner} />
      <BannerContainer>
        <StarContainer>
          <TitleContainer>
            <LawStatus>{datas.lawStatus}</LawStatus>
            <Title>{datas.lawTitle}</Title>
            <Date>발의일 | {datas.propositionDate}</Date>
          </TitleContainer>
          <Star />
        </StarContainer>
      </BannerContainer>
      <Smmation>
        <SmmationTitle>법안 요약 정리</SmmationTitle>
        <Line />
        <SmmationContent>{datas.lawSummaryContent}</SmmationContent>
      </Smmation>
    </div>
  );
};

const SmmationContent = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #000000;
`;

const SmmationTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e7e9ec;
`;

const Smmation = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #f7f8f8;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 40%;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 297px;
  display: flex;
  align-items: center;
  padding-left: 300px;
  @media (max-width: 1725px) {
    height: 250px;
  }
  @media (max-width: 1481px) {
    height: 230px;
  }
`;

const Banner = styled.img`
  z-index: -1;
  width: 100%;
  position: absolute;
  top: 68px;
  left: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const LawStatus = styled.div`
  border: 1px solid #ffffff;
  border-radius: 6px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  padding: 6px 16px;
  width: fit-content;
`;

const Date = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #9c9c9c;
  @media (max-width: 1493px) {
    font-size: 14px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  @media (max-width: 1493px) {
    font-size: 28px;
  }
`;
