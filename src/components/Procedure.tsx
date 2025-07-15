import styled from '@emotion/styled';
import {
  Committee,
  Enforce,
  Passing,
  Promulgate,
  Receipt,
  Sentence,
} from '../assets';

export const Procedure = () => {
  return (
    <AllContainer>
      <ContentAllContainer>
        <Receipt />
        <ContentContainer>
          <Title>접수</Title>
          <Content>법안 초안을 제출</Content>
        </ContentContainer>
      </ContentAllContainer>
      <ContentAllContainer>
        <Committee />
        <ContentContainer>
          <Title>위원회 심사</Title>
          <Content>내용을 검토하고 수정/보완</Content>
        </ContentContainer>
      </ContentAllContainer>
      <ContentAllContainer>
        <Sentence />
        <ContentContainer>
          <Title>체계자구 심사</Title>
          <Content>법안 문장 구조를 검사</Content>
        </ContentContainer>
      </ContentAllContainer>
      <ContentAllContainer>
        <Passing />
        <ContentContainer>
          <Title>본회의 통과</Title>
          <Content>찬반 투표로 최종 의결</Content>
        </ContentContainer>
      </ContentAllContainer>
      <ContentAllContainer>
        <Promulgate />
        <ContentContainer>
          <Title>공포</Title>
          <Content>대통령 서명 후 국민에게 알림</Content>
        </ContentContainer>
      </ContentAllContainer>
      <ContentAllContainer>
        <Enforce />
        <ContentContainer>
          <Title>시행</Title>
          <Content>법이 실제로 적용</Content>
        </ContentContainer>
      </ContentAllContainer>
    </AllContainer>
  );
};

const AllContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 72px 32px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
`;

const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const ContentAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;
