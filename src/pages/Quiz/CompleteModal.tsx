import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface PropsType {
  score: number,
  total: number,
  onClose: () => void
}

export const CompleteModal = ({ score, total, onClose }: PropsType) => {
  const navigation = useNavigate();

  const handleFinish = () => {
    onClose();
    setTimeout(() => navigation('/bill/main'), 100);
  }

  return (
    <>
      <ResultWrapper>
        <QuizTag>퀴즈 결과</QuizTag>
        <ResultTitle>{score} / {total}</ResultTitle>
      </ResultWrapper>

      <ContentWrapper>
        <Title>내용을 충분히 이해하셨나요?</Title>
        <Description>{`더 알고 싶다면 다시 풀거나\n법안 정보를 살펴보세요!`}</Description>
      </ContentWrapper>

      <Button onClick={handleFinish}>종료하기</Button>
    </>
  )
}

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const QuizTag = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px;
  border-radius: 24px;
  border: 1.2px solid #2364E5;
  background-color: #F3F7FF;
  color: #2364E5;
`

const ResultTitle = styled.p`
  font-size: 48px;
  font-weight: 600;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
`

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #8D8D8D;
  white-space: pre-line;
  text-align: center;
`

const Button = styled.button`
  width: 100%;
  height: 56px;
  padding: 16px 24px;
  border-radius: 8px;
  background-color: #1D3055;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`