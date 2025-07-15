import styled from "@emotion/styled";

const footerData = [
  "법과 정책을 쉽게 배우고 참여하는 플랫폼",
  "대전광역시 유성구 가정북로 76 (장동) 대덕소프트웨어마이스터고등학교",
  "https://github.com/2025-DSM-1",
  "Back-end : 채도훈, 김민수  | Front-end : 임다영, 박지연 | AI : 조영준 | Design : 박예빈, 전재준"
]

export const Footer = () => {
  return (
    <Container>
      <Content>
        <Logo>KNOWLAW</Logo>
        {footerData.map((value, index) => <Info key={index}>{value}</Info>)}
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  padding: 63px;
  display: flex;
  justify-content: center;
  background-color: #0D111A;
`

const Content = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Logo = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
`

const Info = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #fff;
`