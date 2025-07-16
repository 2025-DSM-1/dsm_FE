import styled from '@emotion/styled';
import { Button, Procedure } from '../components';
import { Post } from '../components/Post';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLawList } from '../apis/Law';

export const BillList = () => {
  const { data, isLoading, error } = useLawList();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(20);

  const handleMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const handlePostClick = (id: number) => {
    navigate(`/bill/detail/${id}`);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !data) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <ButtonContainer>
        <TitleContainer>
          <Title>법안 모아보기</Title>
          <ProcedureContainer>
            <ProcedureTitle>[ 법안 처리 절차 ]</ProcedureTitle>
            <Procedure />
          </ProcedureContainer>
        </TitleContainer>
        <PostCountContainer>
          <PostCount>
            총{' '}
            <PostCount style={{ fontWeight: '600' }}>{data.length}</PostCount>개
          </PostCount>
          <div>
            <TabBarContainer>
              <TabTitle basis="48rem">법안</TabTitle>
              <TabTitle basis="9.5rem">공포일</TabTitle>
              <TabTitle basis="9.5rem">시행일</TabTitle>
              <TabTitle basis="4.4rem">상태</TabTitle>
            </TabBarContainer>
            <PostContainer>
              {data?.list?.slice(0, visibleCount).map((law) => (
                <Post
                  onClick={() => handlePostClick(law.id)}
                  key={law.id}
                  title={law.title}
                  content={law.content}
                  enforcementDate={law.enforcementDate}
                  promulgationDate={law.promulgationDate}
                  status={law.status}
                />
              ))}
            </PostContainer>
          </div>
        </PostCountContainer>
        {visibleCount < data.length && (
          <Button
            backgroundColor="#FFFFFF"
            color="#8D8D8D"
            borderColor="#D4D4D4"
            onClick={handleMore}
          >
            더보기 ({visibleCount}/{data.length}) +
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

// 스타일은 그대로 유지
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.125rem;
`;

const Container = styled.div`
  padding: 3.375rem 8.75rem;
  display: flex;
  flex-direction: column;
  gap: 3.125rem;
`;

const PostCountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const PostCount = styled.span`
  font-size: 1rem;
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabBarContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  height: 2.5625rem;
  display: flex;
  padding: 0.625rem 2.25rem;
  background-color: #1d3055;
`;

const TabTitle = styled.div<{ basis: string }>`
  font-size: 1.125rem;
  color: #ffffff;
  flex: 0 0 ${({ basis }) => basis};
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.1875rem;
`;

const ProcedureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.125rem;
  padding: 1.125rem 2.75rem;
  border-radius: 0.75rem;
  border: 1px solid #e3e3e3;
  background-color: #fafafa;
  width: 100%;
`;

const ProcedureTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
