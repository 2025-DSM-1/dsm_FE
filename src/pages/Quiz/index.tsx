import * as S from "./style"
import { Question, Check, X } from "../../assets"
import { useState } from "react"
import Modal from "../../components/Modal"
import { CompleteModal } from "./CompleteModal"

const data = [
  {
    problem: "법안을 국회에 처음 제출하는 절차는?",
    options: ["발의", "찬성", "개정", "공포"],
    answer: "발의",
    reason: "법안이 국회에 처음 제출되는 절차를 '발의'라고 합니다.\n국회의원 또는 정부가 법안을 국회에 공식적으로 제안하는 것이며, 발의된 법안은 이후 상임위원회 심사, 법제사법위원회, 본회의 의결 등의 절차를 거칩니다."
  },
  {
    problem: "'중대재해처벌법'의 주요 취지는 무엇인가요?",
    options: [
      "기업이 낸 세금을 높이기 위해 만든 법이다.",
      "노동자가 산재로 사망했을 때 기업의 경영책임자를\n처벌하기 위해 제정된 법이다.",
      "공공기관의 예산 집행을 감시하기 위한 법이다.",
      "소비자 권리 보호를 위해 만든 법이다."
    ],
    answer: "노동자가 산재로 사망했을 때 기업의 경영책임자를\n처벌하기 위해 제정된 법이다.",
    reason: "중대재해처벌법은 산업현장에서 노동자가 산재로 사망했을 때 등의 중대재해가 발생했을 때 경영책임자를 처벌하기 위해 규정한 법입니다."
  },
  {
    problem: "'근로기준법'에서 정한 법정 근로시간은 일반적으로 주 몇 시간인가요?",
    options: ["주 35시간", "주 40시간", "주 50시간", "주 52시간"],
    answer: "주 40시간",
    reason: "근로기준법상 법정 근로시간은 주 40시간이며, 연장근로 포함 시 최대 52시간까지 가능합니다."
  },
  {
    problem: "다음 중 '법률안 공포'에 대한 설명으로 맞는 것은?",
    options: [
      "법률이 확정되면 대통령이 이를 국민에게 알리는 절차이다.",
      "법률이 국회에서 가결되기 전 국민에게 알리는 절차이다.",
      "국회의장이 직접 국민에게 법률을 알리는 절차이다.",
      "국무총리가 법률의 시행일을 정하는 절차이다."
    ],
    answer: "법률이 확정되면 대통령이 이를 국민에게 알리는 절차이다.",
    reason: "법률안 공포는 대통령이 법률 확정을 공식적으로 국민에게 알리는 절차입니다."
  },
  {
    problem: "다음 중 법안이 본회의에서 의결된 후 거치는 절차가 아닌 것은 무엇인가요?",
    options: ["법률안 공포", "법제사법위원회 검토", "대통령의 거부권 행사 가능", "국민투표로 확정"],
    answer: "국민투표로 확정",
    reason: "일반 법안은 국민투표를 거치지 않고, 국회 의결 후 대통령 공포로 확정됩니다. 국민투표는 헌법 개정 등 특정 사안에만 해당됩니다."
  },
]

export const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [correctCount, setCorrectCount] = useState(0)

  const currentQuestion = data[currentIndex];
  const progress = data.length > 1
    ? 20 + (currentIndex / (data.length - 1)) * 80
    : 100;

  const handleSubmit = () => {
    if (selectedOption === null) return alert("선택지를 골라주세요!");

    const isAnswerCorrect = selectedOption === currentQuestion.answer;
    if (isAnswerCorrect) setCorrectCount((prev) => prev + 1)

    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      setIsCorrect(null);
    } else {
      setIsModalOpen(true);
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
              {currentQuestion.options.map((option, idx) => {
                let isCorrectOption = option === currentQuestion.answer;
                let isSelectedWrong = selectedOption === option && !isCorrectOption;

                return (
                  <S.OptionBox
                    key={idx}
                    isSelected={selectedOption === option}
                    isCorrect={showAnswer && isCorrectOption}
                    isWrong={showAnswer && isSelectedWrong}
                    onClick={() => {
                      if (!showAnswer) setSelectedOption(option);
                    }}
                  >
                    {option}
                  </S.OptionBox>
                );
              })}
            </S.OptionWrapper>
          </S.ProblemOptionWrapper>

          {showAnswer && (
            <S.AnswerBox isCorrect={isCorrect}>
              <S.AnswerTitleWrapper>
                {isCorrect ?
                  <Check color="#1C8543" /> :
                  <X color="#D63636" />
                }
                <S.AnswerTitle>{isCorrect ? "맞았습니다" : "틀렸습니다"}</S.AnswerTitle>
              </S.AnswerTitleWrapper>
              <S.AnswerReason>{currentQuestion.reason}</S.AnswerReason>
            </S.AnswerBox>
          )}

          <S.SubmitButton onClick={showAnswer ? handleNextQuestion : handleSubmit}>
            {showAnswer
              ? currentIndex < data.length - 1
                ? "다음 문제"
                : "퀴즈 완료"
              : "정답 제출하기"}
          </S.SubmitButton>
        </S.QuizSection>
      </S.QuizContent>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CompleteModal
            score={correctCount}
            total={data.length}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </S.Container>
  )
}