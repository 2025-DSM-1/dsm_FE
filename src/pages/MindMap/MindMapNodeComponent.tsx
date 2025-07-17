import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { type MindMapNode } from './type';
import { Link } from 'lucide-react';
import { Quote } from '../../assets';
import { formatDate } from '../../hooks/formatDate';
import { useLawDetail } from "../../apis/Law";

interface MindMapNodeComponentProps {
  node: MindMapNode;
  isSelected: boolean;
  isConnecting: boolean;
  onClick: () => void;
  onMove: (nodeId: string, x: number, y: number) => void;
  onDelete: (nodeId: string) => void;
  onStartConnection: (nodeId: string) => void;
}

const Container = styled.div<{
  left: number;
  top: number;
  isSelected: boolean;
  isConnecting: boolean;
}>`
  perspective: 1000px;
  position: absolute;
  width: 320px;
  height: 180px;
  background: white;
  border-radius: 0.5rem;
  border-width: 2px;
  border-style: solid;
  cursor: move;
  transition: all 0.2s;

  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  z-index: ${({ isSelected }) => (isSelected ? 20 : 10)};
  
  border-color: ${({ isSelected }) => (isSelected ? '#3b82f6' : '#e5e7eb')};
  &:hover {
    border-color: ${({ isSelected, isConnecting }) =>
    isSelected ? '#3b82f6' : isConnecting ? '#60a5fa' : '#d1d5db'};
    background-color: ${({ isConnecting }) => (isConnecting ? '#eff6ff' : 'white')};
    box-shadow: ${({ isSelected, isConnecting }) =>
    isSelected || isConnecting
      ? '0 0 0 2px rgb(59 130 246 / 0.5), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)'
      : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)'};
  }
`;

const CardInner = styled.div<{ isFront: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFront }) => (isFront ? "rotateY(0deg)" : "rotateY(180deg)")};
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardFaceFront = styled(CardFace)``;

const CardFaceBack = styled(CardFace)`
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const QuoteIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

const LawTitleText = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const LabelText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #9c9c9c;
`;

const NumberText = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  padding: 12px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: end;
`

const IconButton = styled.button`
  padding: 0.25rem;
  color: #9ca3af;
  transition: color 0.15s;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.5rem;
`;

const SelectedMark = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1rem;
  height: 1rem;
  background-color: #3b82f6;
  border-radius: 9999px;
  border: 2px solid white;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const StatusTag = styled.span`
  background-color: #1D3055;
  color: #fff;
  padding: 4px 12px;
  border-radius: 30px;
  font-weight: 400;
  font-size: 12px;
`;

const DateLabel = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #818181;
`;

export const MindMapNodeComponent: React.FC<MindMapNodeComponentProps> = ({
  node,
  isSelected,
  isConnecting,
  onClick,
  onMove,
  onStartConnection,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isFront, setIsFront] = useState<boolean>(true);

  // const { data } = useLawDetail(lawId);

  const data = {
    lawId: 1,
    lawTitle: "청소년 보호법 일부개정법률안",
    lawSummaryContent: [
      { summaryElement: "청소년 유해 매체물의 범위에 SNS, 1인 미디어 등을 포함한다." },
      { summaryElement: "유해 매체물에 대한 온라인 플랫폼의 사전 필터링 의무를 강화한다." },
      { summaryElement: "유해 매체물 유통 시 처벌 수위를 상향 조정한다." }
    ],
    lawStatus: "발의",
    propositionDate: "2024-05-05",
    backgroundInfo: "최근 온라인 플랫폼을 통해 청소년에게 노출되는 유해 매체물의 범위가 다양해지고 있는 상황에서, 기존 법령이 이를 충분히 규제하지 못한다는 지적이 제기되었다. 이에 따라 법적 정의를 확장하고, 실효성 있는 제재 수단을 마련하고자 개정이 추진되었다.",
    example: "예를 들어, BJ의 음란 방송이나 자극적인 숏폼 콘텐츠 등이 청소년에게 쉽게 노출되고 있으나 현재 법령으로는 이를 제재하기 어렵다. 개정안은 이를 유해 매체물로 명확히 규정하고, 플랫폼 사업자에게 필터링 의무를 부과하도록 하고 있다."
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof HTMLButtonElement) return;

      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      e.preventDefault();
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const canvas = document.querySelector('[data-canvas]') as HTMLElement;
      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - dragOffset.x;
      const y = e.clientY - canvasRect.top - dragOffset.y;

      onMove(node.id, x, y);
    },
    [isDragging, dragOffset, node.id, onMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClick = () => {
    setIsFront((prev) => !prev);
    onClick();
  };

  const { law } = node;

  return (
    <Container
      left={node.x}
      top={node.y}
      isSelected={isSelected}
      isConnecting={isConnecting}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      <CardInner isFront={isFront}>
        <CardFaceFront>
          <TitleSection>
            <QuoteIcon src={Quote} alt="Quote" />
            <TitleWrapper>
              <LawTitleText>{node.law.lawTitle}</LawTitleText>
              <IconWrapper>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartConnection(node.id);
                  }}
                  title="연결 시작"
                  type="button"
                >
                  <Link size={16} />
                </IconButton>
              </IconWrapper>
            </TitleWrapper>
          </TitleSection>
          <BottomSection>
            <StatusTag>{data.lawStatus}</StatusTag>
            <DateLabel>{formatDate(data.propositionDate)}</DateLabel>
          </BottomSection>
        </CardFaceFront>

        <CardFaceBack>
          <CardHeader>
            <LabelText>의안번호</LabelText>
            <NumberText>{law.lawSerialNumber}</NumberText>
          </CardHeader>

          <DescriptionText>{law.lawContent}</DescriptionText>
        </CardFaceBack>
      </CardInner>

      {isSelected && <SelectedMark />}
    </Container >
  );
};