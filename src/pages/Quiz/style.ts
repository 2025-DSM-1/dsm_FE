import styled from "@emotion/styled"

interface OptionBoxProps {
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const QuizContent = styled.div`
  width: 653px;
  display: flex;
  flex-direction: column;
  gap: 112px;
  padding: 42px 0 120px;
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #F4F5FA;
  border-radius: 20px;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 6px;
  background-color: #1D3055;
  border-radius: 20px;
  transition: width 0.3s ease-in-out;
`

export const QuizSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;
`

export const ProblemOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;
`

export const ProblemWrapper = styled.div`
  display: flex;
  gap: 16px;
`

export const QuestionIcon = styled.img`
  width: 38px;
  height: 27px;
`

export const ProblemText = styled.p`
  font-size: 26px;
  font-weight: 600;
`

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const OptionBox = styled.div<OptionBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 10px;
  border-radius: 10px;
  border: 1px solid;

  background-color: ${({ isCorrect, isWrong, isSelected }) => {
    if (isCorrect) return "#F1FFF6";
    if (isWrong) return "#FFEFEF";
    if (isSelected) return "#E8F0FF";
    return "#FAFAFC";
  }};

  border-color: ${({ isCorrect, isWrong, isSelected }) => {
    if (isCorrect) return "#22C55E";
    if (isWrong) return "#EF4444";
    if (isSelected) return "#3B70DA";
    return "#DFDFED";
  }};

  color: ${({ isCorrect, isWrong, isSelected }) => {
    if (isCorrect) return "#22C55E";
    if (isWrong) return "#EF4444";
    if (isSelected) return "#3B70DA";
    return "#000";
  }};
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  padding: 16px 24px;
  border-radius: 8px;
  background-color: #1D3055;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`

export const AnswerBox = styled.div<{ isCorrect: boolean | null }>`
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  gap: 15px;
  border-radius: 10px;
  background-color: ${({ isCorrect }) => isCorrect ? '#F1FFF6' : '#FFEFEF'};
  color: ${({ isCorrect }) => isCorrect ? '#1C8543' : '#D63636'};
  border: 1px solid ${({ isCorrect }) => isCorrect ? '#60E993' : '#E9ACAC'};
`

export const AnswerTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const AnswerTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
`

export const AnswerReason = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
`