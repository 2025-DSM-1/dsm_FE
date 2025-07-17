import styled from '@emotion/styled';
import { Button, Procedure } from '../components';
import { Post } from '../components/Post';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLawList } from '../apis/Law';

export const BillList = () => {
  const { data } = useLawList();

  console.log(data);
  //   const [datas] = useState([
  //     {
  //       id: 1,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '발의',
  //     },
  //     {
  //       id: 2,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '접수',
  //     },
  //     {
  //       id: 3,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '심사',
  //     },
  //     {
  //       id: 4,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '통과',
  //     },
  //     {
  //       id: 5,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '공포',
  //     },
  //     {
  //       id: 6,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '시행',
  //     },
  //     {
  //       id: 7,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '발의',
  //     },
  //     {
  //       id: 8,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '접수',
  //     },
  //     {
  //       id: 9,
  //       title: '청소년 보호법',
  //       content: '청소년 유해 매체물 규제 강화',
  //       promulgationDate: '2024-02-02',
  //       resolutionResult: '공포',
  //       status: '심사',
  //     },
  //   ]);

  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(20);

  const handleMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const handlePostClick = (id: number) => {
    navigate(`/bill/detail/${id}`);
  };

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
            <PostCount style={{ fontWeight: '600' }}>
              {' '}
              {data?.laws?.length || 0}
            </PostCount>
            개
          </PostCount>
          <div>
            <TabBarContainer>
              <TabTitle basis="43rem">법안</TabTitle>
              <TabTitle basis="9.5rem">제안일자</TabTitle>
              <TabTitle basis="9.5rem">의결결과</TabTitle>
              <TabTitle basis="8rem">상태</TabTitle>
            </TabBarContainer>
            <PostContainer>
              {data?.laws?.slice(0, visibleCount).map((law) => (
                <Post
                  onClick={() => handlePostClick(law.lawId)}
                  key={law.lawId}
                  title={law.lawTitle}
                  content={law.content}
                  resolutionResult={law.resolutionResult}
                  promulgationDate={law.promulgationDate}
                  status={law.lawStatus}
                />
              ))}
            </PostContainer>
          </div>
        </PostCountContainer>
        {data?.laws && visibleCount < data.laws.length && (
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
  background-color: #000;
`;

const TabTitle = styled.div<{ basis: string }>`
  font-size: 1rem;
  font-weight: 400;
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
