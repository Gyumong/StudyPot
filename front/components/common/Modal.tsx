import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@lib/slices";
import { deleteModal } from "@lib/slices/ModalSlice";

const Modal: React.FC = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const dispatch = useDispatch();
  const { show, modalList } = useSelector((state: RootState) => state.modal);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    dispatch(deleteModal());
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {modalList?.title && <StyledModalTitle>{modalList?.title}</StyledModalTitle>}
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
  } else {
    return null;
  }
};

const StyledModalTitle = styled.div``;

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
