import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Search } from 'lucide-react';
import { useLawList } from '../../apis/Law';
import { type Law } from './type';
import { Quote } from '../../assets'
import { formatDate } from '../../hooks/formatDate';

const SidebarContainer = styled.div`
  width: 320px;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
`;

const LawsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f9fafb;
`;

const SearchWrapper = styled.div`
  margin-bottom: 1rem;
  position: relative;
  padding: 12px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1rem;
  width: 1rem;
  color: #9ca3af;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.7rem 1.5rem 0.7rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const CardWrapper = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 136px;
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

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LawTitleText = styled.p`
  font-size: 16px;
  font-weight: 600;
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

const QuoteIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const LawSidebar: React.FC = () => {
  // const { data: lawResponse } = useLawList();
  // const laws = lawResponse?.laws ?? [];

  const laws: Law[] = [
    {
      lawId: 1,
      lawSerialNumber: 2024001001,
      lawTitle: "청소년 보호법 일부개정법률안",
      lawStatus: "처리완료",
      lawContent: "청소년 유해 매체물의 범위를 확대하고, 관련 규제를 강화한다.",
      promulgationDate: "2024-05-01",
      resolutionResult: "공포",
    },
    {
      lawId: 2,
      lawSerialNumber: 2024001002,
      lawTitle: "개인정보 보호법 전부개정법률안",
      lawStatus: "처리완료",
      lawContent: "개인정보 처리자의 책임을 강화하고, 정보주체의 권리를 확대한다.",
      promulgationDate: "2024-06-15",
      resolutionResult: "공포",
    },
    {
      lawId: 3,
      lawSerialNumber: 2024001003,
      lawTitle: "전자상거래법 개정안",
      lawStatus: "처리완료",
      lawContent: "온라인 쇼핑몰의 소비자 보호 의무를 명확히 하고 분쟁 조정 절차를 신설한다.",
      promulgationDate: "2024-07-10",
      resolutionResult: "공포",
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLaws = laws.filter((law) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      law.lawTitle.toLowerCase().includes(term) ||
      law.lawContent.toLowerCase().includes(term)
    );
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, law: Law) => {
    e.dataTransfer.setData('application/json', JSON.stringify(law));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <SidebarContainer>
      <Header>
        <Title>법안 목록</Title>
      </Header>

      <SearchWrapper>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="법안을 검색해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchWrapper>

      <LawsList>
        {filteredLaws.map((law) => (
          <div
            key={`${law.lawId}-${law.lawTitle}`}
            draggable
            onDragStart={(e) => handleDragStart(e, law)}
          >
            <CardWrapper>
              <CardFace>
                <TitleSection>
                  <QuoteIcon src={Quote} alt="Quote" />
                  <LawTitleText>{law.lawTitle}</LawTitleText>
                </TitleSection>
                <BottomSection>
                  <StatusTag>{law.resolutionResult}</StatusTag>
                  {law.promulgationDate && (
                    <DateLabel>{formatDate(law.promulgationDate)}</DateLabel>
                  )}
                </BottomSection>
              </CardFace>
            </CardWrapper>
          </div>
        ))}
      </LawsList>
    </SidebarContainer>
  );
};
