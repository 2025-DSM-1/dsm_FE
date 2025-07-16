import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { banner, Quotes, Star } from '../assets';
import { Button, CommentPost } from '../components';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const CardDetail = () => {
  const chartRef = useRef<any>(null);

  const [datas] = useState({
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

  const [commentDatas] = useState([
    {
      commentId: 1,
      commentType: 'ADDITIONAL',
      voteType: 'AGREE',
      content: '2020년에 국내 대기업 B사가...',
      author: '박**',
    },
    {
      commentId: 2,
      commentType: 'REBUTTAL',
      voteType: 'DISAGREE',
      content: '2020년에 국내 대기업 B사가...',
      author: '박**',
    },
    {
      commentId: 3,
      commentType: 'BASIC',
      voteType: 'AGREE',
      content: '2020년에 국내 대기업 B사가...',
      author: '박**',
    },
  ]);

  const [commentWriteDatas, setCommentWriteDatas] = useState({
    commentType: 'BASIC' as 'BASIC' | 'ADDITIONAL' | 'REBUTTAL',
    content: '',
  });

  const [voteDatas] = useState<{
    agree: number;
    disagree: number;
    totalVote: number;
  }>({
    agree: 30,
    disagree: 70,
    totalVote: 245,
  });

  // 투표 값 상태 추가
  const [voteValue, setVoteValue] = useState<'AGREE' | 'DISAGREE' | null>(null);

  // Clean up chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const voteData = {
    labels: [],
    datasets: [
      {
        data: [voteDatas.agree, voteDatas.disagree],
        backgroundColor: ['#0290F4', '#E90404'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const voteOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const [isStarClick, setIsStarClick] = useState<boolean>(false);

  const handleStarClick = () => {
    setIsStarClick(!isStarClick);
    if (isStarClick) {
      //즐겨찾기 api
    }
  };

  // 투표 선택 핸들러
  const handleVoteClick = (vote: 'AGREE' | 'DISAGREE') => {
    setVoteValue(vote);
  };

  const handleTabClick = (type: 'BASIC' | 'ADDITIONAL' | 'REBUTTAL') => {
    setCommentWriteDatas((prev) => ({
      ...prev,
      commentType: type,
    }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (voteValue === null) {
      alert('의견을 입력하려면 찬반 투표를 진행해주세요');
      return;
    }
    setCommentWriteDatas((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const handleCommentWriting = () => {
    if (voteValue === null) {
      alert('의견을 입력하려면 찬반 투표를 진행해주세요');
      return;
    }
    //댓글 작성 api
  };

  return (
    <AllContainer>
      <ChartAllContainer>
        <ChartContentContainer>
          <ChartTitle>해당 법안의 투표 비율 </ChartTitle>
          <Line />
          <ChartSubContainer>
            <ChartContainer>
              <ChartTextContainer>
                <ChartTextTitle>현재 투표인원</ChartTextTitle>
                <ChartText>{voteDatas.totalVote}명</ChartText>
              </ChartTextContainer>
              <Doughnut ref={chartRef} data={voteData} options={voteOptions} />
            </ChartContainer>
            <PercentContainer>
              <PercentText>찬성 : {voteDatas.agree}%</PercentText>
              <PercentText>반대 : {voteDatas.disagree}%</PercentText>
            </PercentContainer>
          </ChartSubContainer>
          <Line />
          <ChartBtnContainer>
            <Button
              backgroundColor={voteValue === 'AGREE' ? '#1D3055' : '#ffffff'}
              color={voteValue === 'AGREE' ? '#ffffff' : '#1D3055'}
              borderColor="#1D3055"
              onClick={() => handleVoteClick('AGREE')}
            >
              법안 찬성
            </Button>
            <Button
              backgroundColor={voteValue === 'DISAGREE' ? '#1D3055' : '#ffffff'}
              color={voteValue === 'DISAGREE' ? '#ffffff' : '#1D3055'}
              borderColor="#1D3055"
              onClick={() => handleVoteClick('DISAGREE')}
            >
              법안 반대
            </Button>
          </ChartBtnContainer>
        </ChartContentContainer>
      </ChartAllContainer>
      <Banner src={banner} />
      <BannerContainer>
        <StarContainer>
          <TitleContainer>
            <LawStatus>{datas.lawStatus}</LawStatus>
            <LawTitle>{datas.lawTitle}</LawTitle>
            <Date>제안일자 | {datas.propositionDate}</Date>
          </TitleContainer>
          <Star onClick={handleStarClick} isClick={isStarClick} />
        </StarContainer>
      </BannerContainer>
      <ContentContainer>
        <ThoughtAllContainer>
          <Smmation>
            <SmmationTitle>법안 요약 정리</SmmationTitle>
            <Line />
            <SmmationContent>{datas.lawSummaryContent}</SmmationContent>
          </Smmation>
          <ExplanationAllContainer>
            <Quotes />
            <ExplanationContainer>
              <ExplanationTitle>
                {datas.lawTitle}에 관한 법률안은 이렇게 생겨났어요!
              </ExplanationTitle>
              <ExplanationContent>{datas.backgroundInfo}</ExplanationContent>
            </ExplanationContainer>
            <ExplanationContainer>
              <ExplanationTitle>왜 법이 필요했나?</ExplanationTitle>
              <ExplanationContent>{datas.example}</ExplanationContent>
            </ExplanationContainer>
          </ExplanationAllContainer>
        </ThoughtAllContainer>
        <ThoughtAllContainer>
          <ThoughtContainer>
            <ThoughtTitle>이 법안, 당신의 생각은?</ThoughtTitle>
            <ThoughtSubTitle>
              찬성/반대 논리를 참고해 내 의견을 펼치고, 다른 사람들의 생각도
              읽어보세요.
            </ThoughtSubTitle>
          </ThoughtContainer>
          <MainThoughtAllContainer>
            <MainThoughtContainer>
              <MainThoughtTitle>찬성 측, 대표 논리</MainThoughtTitle>
              <MainThoughtContentContainer>
                <Quotes size="20" color="#ffffff" />
                <MainThoughtContent>
                  찬성 논리 예시 텍스트...
                </MainThoughtContent>
              </MainThoughtContentContainer>
            </MainThoughtContainer>
            <MainThoughtContainer>
              <MainThoughtTitle>반대 측, 대표 논리</MainThoughtTitle>
              <MainThoughtContentContainer>
                <Quotes size="20" color="#ffffff" />
                <MainThoughtContent>
                  반대 논리 예시 텍스트...
                </MainThoughtContent>
              </MainThoughtContentContainer>
            </MainThoughtContainer>
          </MainThoughtAllContainer>
          <TalkAllContainer>
            <TalkTitleContainer>입장 간 대화</TalkTitleContainer>
            <TalkContentContainer>
              {commentDatas.map((data) => (
                <CommentPost
                  key={data.commentId}
                  commentType={data.commentType}
                  voteType={data.voteType}
                  author={data.author}
                  content={data.content}
                />
              ))}
            </TalkContentContainer>
            <TalkFooterContainer>
              <TalkFooterMsg>
                *해당하는 역할을 선택하여 글을 작성해주세요.
              </TalkFooterMsg>
              <TalkFooterTabContainer>
                <TabButton
                  isClick={commentWriteDatas.commentType === 'BASIC'}
                  onClick={() => handleTabClick('BASIC')}
                >
                  근거
                </TabButton>
                <TabButton
                  isClick={commentWriteDatas.commentType === 'ADDITIONAL'}
                  onClick={() => handleTabClick('ADDITIONAL')}
                >
                  추가 논리
                </TabButton>
                <TabButton
                  isClick={commentWriteDatas.commentType === 'REBUTTAL'}
                  onClick={() => handleTabClick('REBUTTAL')}
                >
                  반박
                </TabButton>
              </TalkFooterTabContainer>
              <TalkTextContainer>
                <TalkTextArea
                  placeholder="의견 작성하기"
                  value={commentWriteDatas.content}
                  onChange={handleContentChange}
                />
                <Button
                  onClick={handleCommentWriting}
                  isBlocked={voteValue === null}
                >
                  글 등록
                </Button>
              </TalkTextContainer>
            </TalkFooterContainer>
          </TalkAllContainer>
        </ThoughtAllContainer>
      </ContentContainer>
    </AllContainer>
  );
};

const ChartBtnContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const ChartSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChartContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const PercentContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const PercentText = styled.div`
  color: #b9b9b9;
  font-size: 14px;
`;

const ChartAllContainer = styled.div`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100px;
  right: 140px;
  background-color: #ffffff;
`;
const ChartContainer = styled.div`
  width: 220px;
  height: 220px;
  position: relative;
`;

const ChartText = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const ChartTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  position: absolute;
  top: 90px;
  left: 80px;
`;

const ChartTextTitle = styled.div`
  font-size: 12px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 110px;
  padding: 60px 0;
`;

const AllContainer = styled.div`
  width: 100%;
  padding: 0 500px 100px 240px;
`;

const TabButton = styled.button<{ isClick: boolean }>`
  padding: 8px 22px;
  border-radius: 30px;
  border: 1px solid #1d3055;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isClick }) => (isClick ? '#1D3055' : '#ffffff')};
  color: ${({ isClick }) => (isClick ? '#ffffff' : '#1D3055')};
`;

const TalkAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TalkContentContainer = styled.div`
  height: 600px;
  width: 100%;
  border: 1px solid #e7e7e7;
  background-color: #ffffff;
  padding: 26px 25px;
  display: flex;
  flex-direction: column;
  gap: 34px;
  overflow: scroll;
`;

const TalkTitleContainer = styled.div`
  border-radius: 12px 12px 0 0;
  border: 1px solid #e7e7e7;
  background-color: #ffffff;
  width: 100%;
  padding: 26px 25px;
  font-size: 24px;
  font-weight: 700;
`;

const TalkTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 12px;
`;

const TalkTextArea = styled.textarea`
  width: 100%;
  height: 110px;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  background-color: #f6f6f6;
  font-size: 16px;
  padding: 16px;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #888888;
  }
`;

const TalkFooterMsg = styled.div`
  font-size: 18px;
  color: #a1a1a1;
  font-weight: 500;
`;

const TalkFooterTabContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TalkFooterContainer = styled.div`
  border-radius: 0 0 12px 12px;
  border: 1px solid #e7e7e7;
  background-color: #ffffff;
  width: 100%;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ThoughtAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MainThoughtAllContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const MainThoughtContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 368px;
`;

const MainThoughtTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
`;

const MainThoughtContent = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
`;

const MainThoughtContainer = styled.div`
  padding: 26px;
  border-radius: 12px;
  background-color: #1d3055;
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
`;

const ThoughtContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ThoughtTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
`;

const ThoughtSubTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #a49d9d;
`;

const ExplanationAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ExplanationContent = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const ExplanationTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
  width: 100%;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 297px;
  display: flex;
  align-items: center;
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
`;

const LawTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
`;
