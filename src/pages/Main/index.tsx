import * as S from './style';
import { Banner } from './Banner';
import { Arrow, LatestBillsLinkBox } from '../../assets';
import { BillCard } from './Card';
import { useNavigate } from 'react-router-dom';

const data = {
  laws: [
    {
      lawId: 1,
      lawSerialNumber: 2024001101,
      lawTitle: "청소년 보호법 일부개정법률안",
      lawContent: "청소년 유해 매체물의 기준을 명확히 하고, 관련 법적 책임을 강화한다.",
      promulgationDate: "2024-05-01",
      resolutionResult: "공포"
    },
    {
      lawId: 2,
      lawSerialNumber: 2024001102,
      lawTitle: "개인정보 보호법 전부개정법률안",
      lawContent: "데이터 이동권 신설과 정보주체의 삭제 요청권 강화를 포함한다.",
      promulgationDate: "2024-06-15",
      resolutionResult: "공포"
    },
    {
      lawId: 3,
      lawSerialNumber: 2024001103,
      lawTitle: "전자상거래법 개정안",
      lawContent: "환불 지연에 대한 사업자 책임과 소비자 권리 보호 조항을 신설한다.",
      promulgationDate: "2024-07-10",
      resolutionResult: "공포"
    },
    {
      lawId: 4,
      lawSerialNumber: 2024001104,
      lawTitle: "근로기준법 일부개정법률안",
      lawContent: "탄력근로제 운영 기준을 개편하고, 주 4일 근무제 시범사업 근거를 마련한다.",
      promulgationDate: "2024-07-12",
      resolutionResult: "공포"
    },
    {
      lawId: 5,
      lawSerialNumber: 2024001105,
      lawTitle: "학교폭력 예방 및 대책에 관한 법률 일부개정법률안",
      lawContent: "피해 학생 보호 절차를 강화하고, 가해자 선도 프로그램을 확대한다.",
      promulgationDate: "2024-07-14",
      resolutionResult: "공포"
    },
    {
      lawId: 6,
      lawSerialNumber: 2024001106,
      lawTitle: "환경보건법 개정안",
      lawContent: "어린이 환경 유해물질 노출 최소화를 위한 기준을 도입한다.",
      promulgationDate: "2024-07-15",
      resolutionResult: "공포"
    },
    {
      lawId: 7,
      lawSerialNumber: 2024001107,
      lawTitle: "디지털 성범죄 처벌 강화법",
      lawContent: "불법 촬영물 소지 및 유포에 대한 처벌 수위를 상향한다.",
      promulgationDate: "2024-07-16",
      resolutionResult: "공포"
    },
    {
      lawId: 8,
      lawSerialNumber: 2024001108,
      lawTitle: "소비자기본법 전부개정법률안",
      lawContent: "온라인 플랫폼 내 소비자 권리 보장을 위한 조항을 신설한다.",
      promulgationDate: "2024-07-17",
      resolutionResult: "공포"
    },
    {
      lawId: 9,
      lawSerialNumber: 2024000008,
      lawTitle: "소비자기본법 전부개정법률안",
      lawContent: "온라인 플랫폼 내 소비자 권리 보장을 위한 조항을 신설한다.",
      promulgationDate: "2025-02-17",
      resolutionResult: "공포"
    }
  ]
};


export const Main = () => {
  const navigation = useNavigate();
  const items = Array.from({ length: 9 });

  const recentLaws = data.laws
    .sort((a, b) => new Date(b.promulgationDate).getTime() - new Date(a.promulgationDate).getTime())
    .slice(0, 8);

  return (
    <S.BillOverviewPage>
      <S.TopSection>
        <Banner />

        <S.SideSection>
          <S.AllBillsSummaryBox onClick={() => navigation('/bill/list')}>
            <S.AllBillsTitle>{`전체\n법안 확인하기`}</S.AllBillsTitle>
            <S.Description>{`현재 모든 법안을\n한눈에, 쉽게 확인할 수 있어요`}</S.Description>
          </S.AllBillsSummaryBox>

          <S.QuickLinks>
            <S.LatestBillsLinkBox onClick={() => navigation('/bill/quiz')}>
              <S.LinkText>{`법안\n퀴즈 풀러가기`}</S.LinkText>
              <S.ArrowWrapper>
                <S.ArrowIconWrapper>
                  <Arrow color="#fff" rotate="right" />
                </S.ArrowIconWrapper>
              </S.ArrowWrapper>
            </S.LatestBillsLinkBox>

            <S.LatestBillsLinkBox
              bg={LatestBillsLinkBox}
              onClick={() => navigation('/bill/list')}
            >
              <S.LinkText>{`최신\n법안 보러가기`}</S.LinkText>
              <S.ArrowWrapper>
                <S.ArrowIconWrapper>
                  <Arrow color="#fff" rotate="right" />
                </S.ArrowIconWrapper>
              </S.ArrowWrapper>
            </S.LatestBillsLinkBox>
          </S.QuickLinks>
        </S.SideSection>
      </S.TopSection>

      <S.BottomSection>
        <S.GridWrapper>
          {items.map((_, idx) => {
            if (idx === 0) {
              return (
                <S.SectionHeaderCard key={idx}>
                  <S.SectionTitleWrapper>
                    <S.SectionTitle>{`한눈에 보는\n최신 법안 현황`}</S.SectionTitle>
                    <S.SectionDescription>{`법안 명과 현재 상태,\n핵심 내용을 쉽게 확인하세요.`}</S.SectionDescription>
                  </S.SectionTitleWrapper>
                  <S.ShowMoreButton onClick={() => navigation('/bill/list')}>
                    <S.ShowMoreText>더보기</S.ShowMoreText>
                    <Arrow color="#575757" size={18} rotate="right" />
                  </S.ShowMoreButton>
                </S.SectionHeaderCard>
              );
            }

            return <BillCard key={idx} law={recentLaws[idx - 1]} />
          })}
        </S.GridWrapper>
      </S.BottomSection>
    </S.BillOverviewPage>
  );
};
