import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@lib/slices";
import { deleteModal } from "@lib/slices/ModalSlice";

import StudyModal from "@components/StudyModal";

const Modal: React.FC = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const dispatch = useDispatch();
  const { show } = useSelector((state: RootState) => state.modal);
  const { singleStudy } = useSelector((state: RootState) => state.study);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    dispatch(deleteModal());
  };

  const modalContent = show ? (
    <StyledModalOverlay
      onClick={() => {
        dispatch(deleteModal());
      }}
    >
      <StudyModal studyData={singleStudy} />
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
  } else {
    return null;
  }
};

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
