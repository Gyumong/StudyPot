import { useEffect } from "react";
import { AuthTemplateBlock } from "./styles";
import StudyCard from "@components/StudyCard";
import { GridBox } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { LoadStudy } from "@lib/slices/StudySlice";
const FindStudy = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadStudy());
  }, []);
  return (
    <AuthTemplateBlock>
      <GridBox></GridBox>
    </AuthTemplateBlock>
  );
};

export default FindStudy;
