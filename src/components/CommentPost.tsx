import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

interface ICommentType {
  commentType: string;
  voteType: string;
  content: string;
  author: string;
}

export const CommentPost = ({
  commentType,
  voteType,
  content,
  author,
}: ICommentType) => {
  const [type, setType] = useState<string>('근거');

  useEffect(() => {
    if (commentType === 'BASIC') {
      setType('근거');
    } else if (commentType === 'ADDITIONAL') {
      setType('추가 논리');
    } else if (commentType === 'REBUTTAL') {
      setType('반박');
    }
  }, [commentType]);

  const maskAuthor = (author: string) => {
    if (author.length <= 1) return author;
    return author[0] + '*'.repeat(author.length - 1);
  };

  return (
    <Container>
      {voteType === 'AGREE' && <Dot isAgree={true} />}
      <CommentContainer>
        <ContentContainer>
          <TitleContainer>
            <CommentTypeContainer isAgree={voteType === 'AGREE'}>
              {type}
            </CommentTypeContainer>
            <CommentTitle isAgree={voteType === 'AGREE'}>
              {voteType === 'AGREE' ? '찬성 의견' : '반대 의견'}
            </CommentTitle>
          </TitleContainer>
          <Content>{content}</Content>
        </ContentContainer>
        <Writer>{maskAuthor(author)}</Writer>
      </CommentContainer>
      {voteType === 'DISAGREE' && <Dot isAgree={false} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const CommentTypeContainer = styled.div<{ isAgree: boolean }>`
  padding: 6px 15px;
  border-radius: 30px;
  border: 1px solid ${({ isAgree }) => (isAgree ? '#0290F4' : '#E90404')};
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${({ isAgree }) => (isAgree ? '#0290F4' : '#E90404')};
`;

const CommentTitle = styled.div<{ isAgree: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ isAgree }) => (isAgree ? '#0290F4' : '#E90404')};
`;

const Writer = styled.div`
  font-size: 16px;
  color: #a0a0a0;
  line-height: 28px;
`;

const Dot = styled.div<{ isAgree: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ isAgree }) => (isAgree ? '#0290F4' : '#E90404')};
`;

const CommentContainer = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
