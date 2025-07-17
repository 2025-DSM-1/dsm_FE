import * as S from './style';
import { Banner } from './Banner';
import { Arrow, LatestBillsLinkBox } from '../../assets';
import { BillCard } from './Card';
import { useNavigate } from 'react-router-dom';
import { useLawList } from '../../apis/Law';

export const Main = () => {
  const navigation = useNavigate();
  const { data } = useLawList();

  const recentLaws = data?.laws
    .sort(
      (a, b) =>
        new Date(b.promulgationDate).getTime() -
        new Date(a.promulgationDate).getTime()
    )
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
              onClick={() => navigation('/bill/mindMap')}
            >
              <S.LinkText>{`법안\n마인드맵`}</S.LinkText>
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
          {recentLaws?.map((_, idx) => {
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

            return <BillCard key={idx} law={recentLaws[idx - 1]} />;
          })}
        </S.GridWrapper>
      </S.BottomSection>
    </S.BillOverviewPage>
  );
};
