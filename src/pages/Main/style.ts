import styled from "@emotion/styled";

const hoverLiftStyle = `
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 20px rgba(45, 47, 75, 0.1);
  }
`;

export const BillOverviewPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const TopSection = styled.div`
  width: 1184px;
  display: flex;
  padding: 68px 0;
  gap: 42px;
`

export const SideSection = styled.div`
  display: flex;
  gap: 19px;
`

export const AllBillsSummaryBox = styled.div`
  width: 228px;
  height: 376px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 20px;
  border-radius: 12px;
  border: 1px solid #D8D8D8;
  background-color: #fff;

  ${hoverLiftStyle}
`

export const AllBillsTitle = styled.p`
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  white-space: pre-line;
`

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  white-space: pre-line;
`

export const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const LinkText = styled.p`
  font-size: 22px;
  font-weight: 700;
  line-height: 32px;
  white-space: pre-line;
  color: #fff;
`

export const ArrowIconWrapper = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #EEEEEE;
`

export const LatestBillsLinkBox = styled.div<{ bg?: string }>`
  position: relative;
  width: 228px;
  height: 178px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 20px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ bg }) => (bg ? "transparent" : "#0C53E0")};
  background-image: ${({ bg }) => (bg ? `url(${bg})` : "none")};
  background-size: cover;
  background-position: center;
  cursor: pointer;

  ${hoverLiftStyle}
`

export const ArrowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const BottomSection = styled.div`
  width: 100%;
  padding: 115px 0 174px;
  display: flex;
  justify-content: center;
  background-color: #0D111A;
`

export const SectionHeader = styled.div`
  width: 368px;
  height: 266px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const ShowMoreButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border: 1px solid #575757;
  max-width: fit-content;
  border-radius: 30px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);

    & > p {
      color: white;
    }

    svg {
      stroke: white;
    }
  }
`

export const ShowMoreText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #575757;
`

export const SectionTitle = styled.p`
  font-size: 38px;
  font-weight: 600;
  line-height: 54px;
  white-space: pre-line;
  color: #fff;
`

export const SectionDescription = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 32px;
  white-space: pre-line;
  color: #AFAFAF;
`

export const SectionHeaderCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GridWrapper = styled.div`
  width: 1182px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 38px;
`;