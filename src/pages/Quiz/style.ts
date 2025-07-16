import styled from "@emotion/styled"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const QuizContent = styled.div`
  width: 653px;
  height: 885px;
  display: flex;
  flex-direction: column;
  gap: 112px;
  padding: 42px 0;
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #F4F5FA;
  border-radius: 20px;
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 100%;
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

export const OptionBox = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 10px;
  border-radius: 10px;
  background-color: ${({ isSelected }) => isSelected ? "#E8F0FF" : "#FAFAFC"};
  color: ${({ isSelected }) => isSelected ? "#3B70DA" : "#000000"};
  border: 1px solid ${({ isSelected }) => isSelected ? "#3B70DA" : "#DFDFED"};
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