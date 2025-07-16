import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Banner1, Banner2, Banner3 } from "../../assets";
import { motion, AnimatePresence } from "framer-motion";

const bannerData = [
  {
    image: Banner1,
    title: "오늘,\n내 의견이 세상을 바꾸는 시작입니다!",
    subTitle: "법안도 배우고 토론도 직접 참여해보세요.",
  },
  {
    image: Banner2,
    title: "민주주의는 우리 모두의\n참여로 완성됩니다",
    subTitle: "질문하고, 생각하고, 내 생각을 자유롭게 표현해보세요.",
  },
  {
    image: Banner3,
    title: "지금 바로\n의견을 남겨보세요!",
    subTitle: "여러분의 한마디가 큰 변화를 만듭니다.",
  }
];

export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentBanner = bannerData[currentIndex];

  return (
    <Container bg={currentBanner.image}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TextWrapper>
              <Title>{currentBanner.title}</Title>
              <SubTitle>{currentBanner.subTitle}</SubTitle>
            </TextWrapper>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <ControllerWrapper>
        <CurrentText>{String(currentIndex + 1).padStart(2, '0')}</CurrentText>
        <TotalText>/ {String(bannerData.length).padStart(2, '0')}</TotalText>
      </ControllerWrapper>
    </Container>
  );
};

const Container = styled.div<{ bg: string }>`
  width: 667px;
  height: 376px;
  border-radius: 12px;
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  background-position: center;
  padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  position: relative;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  white-space: pre-line;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 700;
  line-height: 40px;
  color: #fff;
`;

const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #A4A4A4;
`;

const ControllerWrapper = styled.div`
  align-self: flex-start;
  padding: 4px 16px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CurrentText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;

const TotalText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #B3B4B8;
`;
