import React from 'react';
import styled from '@emotion/styled';

interface HeaderProps {
  studyMode: 'explore' | 'quiz' | 'timeline';
  onStudyModeChange: (mode: 'explore' | 'quiz' | 'timeline') => void;
  nodesCount: number;
}

const HeaderContainer = styled.header`
  background-color: white;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NodesInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

export const Header: React.FC<HeaderProps> = ({ nodesCount }) => {
  return (
    <HeaderContainer>
      <NodesInfo>
        <span>{nodesCount}개 법안 배치</span>
      </NodesInfo>
    </HeaderContainer>
  );
};
