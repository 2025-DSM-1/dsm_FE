import styled from "@emotion/styled";
import { useState } from "react";
import { UserInformation } from "./UserInformation";
import { Favorites } from "./Favorites"
import { motion } from "framer-motion";
import { useMy } from "../../apis/User";

const accountItems = ["회원정보 확인"];
const favoriteItems = ["즐겨찾기한 법안"];

export const MyPage = () => {
  const { data } = useMy();

  const [selected, setSelected] = useState<string>("회원정보 확인");

  return (
    <Container>
      <Content>
        <SideSection>
          <Title>마이페이지</Title>
          <SideBarContainer>
            <UserName>{data?.name}</UserName>

            <ListWrapper>
              <ListTitle>계정정보</ListTitle>
              {accountItems.map((item) => (
                <Item
                  key={item}
                  isSelect={selected === item}
                  onClick={() => setSelected(item)}
                >
                  {item}
                </Item>
              ))}
            </ListWrapper>

            <ListWrapper>
              <ListTitle>즐겨찾기</ListTitle>
              {favoriteItems.map((item) => (
                <Item
                  key={item}
                  isSelect={selected === item}
                  onClick={() => setSelected(item)}
                >
                  {item}
                </Item>
              ))}
            </ListWrapper>
          </SideBarContainer>
        </SideSection>

        {selected === "회원정보 확인" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: "100%" }}
            key="info"
          >
            <UserInformation />
          </motion.div>
        )}

        {selected === "즐겨찾기한 법안" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: "100%" }}
            key="fav"
          >
            <Favorites />
          </motion.div>
        )}
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 47px 0 0;
`

const Content = styled.div`
  width: 1182px;
  display: flex;
  justify-content: space-between;
  gap: 82px;
`

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
`

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
`

const SideBarContainer = styled.div`
  width: 214px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`

const UserName = styled.p`
  padding: 0 0 14px;
  border-bottom: 1px solid #EAECEE;
  font-size: 22px;
  font-weight: 600;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ListTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
`

const Item = styled.div<{ isSelect: boolean }>`
  padding: 10px;
  border-radius: 6px;
  background-color: ${({ isSelect }) => isSelect ? '#F9FAFC' : '#fff'};
  color: ${({ isSelect }) => isSelect ? '#000' : '#B2B2B2'};
`