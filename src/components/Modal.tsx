import styled from "@emotion/styled";

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalBox>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalBox = styled.div`
  width: 381px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding: 28px 26px;
  border-radius: 12px;
  background: white;
  border: 1px solid #EBEBEB;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

export default Modal