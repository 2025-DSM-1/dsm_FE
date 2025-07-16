import * as S from "./style"
import Question from "../../assets/Question.png"
import { useState } from "react"

const data = [
  {
    problem: "법안을 국회에 처음 제출하는 절차는?",
    options: ["발의", "찬성", "개정", "공포"]
  },
  {
    problem: "'중대재해처벌법'의 주요 취지는 무엇인가요?",
    options: [
      "기업이 낸 세금을 높이기 위해 만든 법이다.",
      "노동자가 산재로 사망했을 때 기업의 경영책임자를\n처벌하기 위해 제정된 법이다.",
      "공공기관의 예산 집행을 감시하기 위한 법이다.",
      "소비자 권리 보호를 위해 만든 법이다."
    ]
  },
  {
    problem: "'근로기준법'에서 정한 법정 근로시간은 일반적으로 주 몇 시간인가요?",
    options: ["주 35시간", "주 40시간", "주 50시간", "주 52시간"]
  },
  {
    problem: "다음 중 '법률안 공포'에 대한 설명으로 맞는 것은?",
    options: [
      "법률이 확정되면 대통령이 이를 국민에게 알리는 절차이다.",
      "법률이 국회에서 가결되기 전 국민에게 알리는 절차이다.",
      "국회의장이 직접 국민에게 법률을 알리는 절차이다.",
      "국무총리가 법률의 시행일을 정하는 절차이다."
    ]
  },
  {
    problem: "다음 중 법안이 본회의에서 의결된 후 거치는 절차가 아닌 것은 무엇인가요?",
    options: ["법률안 공포", "법제사법위원회 검토", "대통령의 거부권 행사 가능", "국민투표로 확정"]
  },
]

export const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = data[currentIndex];
  const progress = 20 + (currentIndex / (data.length - 1)) * 80;

  const handleSubmit = () => {
    if (selectedOption === null) return alert("선택지를 골라주세요!");

    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      // 마지막 문제까지 완료 시 처리
    }
  };

  return (
    <S.Container>
      <S.QuizContent>
        <S.ProgressBar>
          <S.ProgressFill style={{ width: `${progress}%` }} />
        </S.ProgressBar>

        <S.QuizSection>
          <S.ProblemOptionWrapper>
            <S.ProblemWrapper>
              <S.QuestionIcon src={Question} alt="Question" />
              <S.ProblemText>{currentQuestion.problem}</S.ProblemText>
            </S.ProblemWrapper>

            <S.OptionWrapper>
              {currentQuestion.options.map((option, idx) => (
                <S.OptionBox
                  key={idx}
                  isSelected={selectedOption === option}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </S.OptionBox>
              ))}
            </S.OptionWrapper>
          </S.ProblemOptionWrapper>

          <S.SubmitButton onClick={handleSubmit}>
            {currentIndex < data.length - 1 ? "다음 문제" : "정답 제출하기"}
          </S.SubmitButton>
        </S.QuizSection>
      </S.QuizContent>
    </S.Container>
  )
}