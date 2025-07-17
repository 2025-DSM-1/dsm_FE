import React from 'react';
import styled from '@emotion/styled';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  scale: number;
}

const StyledPath = styled.path<{ scale: number }>`
  stroke: #3B82F6;
  stroke-width: ${({ scale }) => 2 / scale};
  fill: none;
  stroke-dasharray: ${({ scale }) => `${5 / scale} ${3 / scale}`};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const StyledCircle = styled.circle<{ scale: number }>`
  fill: #3B82F6;
  r: ${({ scale }) => 3 / scale};
  animation: pulse 2s infinite;
`;

const StyledPolygon = styled.polygon`
  fill: #3B82F6;
`;

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, scale }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const curvature = Math.min(distance * 0.3, 100);

  const controlPoint1 = {
    x: from.x + curvature,
    y: from.y
  };

  const controlPoint2 = {
    x: to.x - curvature,
    y: to.y
  };

  const pathData = `M ${from.x} ${from.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${to.x} ${to.y}`;

  const angle = Math.atan2(dy, dx);
  const arrowLength = 10 / scale;
  const arrowWidth = 6 / scale;

  const arrowX = to.x - arrowLength * Math.cos(angle);
  const arrowY = to.y - arrowLength * Math.sin(angle);

  const arrowPoint1 = {
    x: arrowX - arrowWidth * Math.cos(angle - Math.PI / 2),
    y: arrowY - arrowWidth * Math.sin(angle - Math.PI / 2)
  };

  const arrowPoint2 = {
    x: arrowX - arrowWidth * Math.cos(angle + Math.PI / 2),
    y: arrowY - arrowWidth * Math.sin(angle + Math.PI / 2)
  };

  return (
    <g>
      <StyledPath d={pathData} scale={scale} />
      <StyledPolygon
        points={`${to.x},${to.y} ${arrowPoint1.x},${arrowPoint1.y} ${arrowPoint2.x},${arrowPoint2.y}`}
      />
      <StyledCircle cx={from.x} cy={from.y} scale={scale} />
      <StyledCircle cx={to.x} cy={to.y} scale={scale} />
    </g>
  );
};
