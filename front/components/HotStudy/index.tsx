import { Frame, GridBox, MoreButton } from "./styles";

import StudyCard from "@components/StudyCard";

const HotStudy = () => {
  return (
    <Frame>
      <h1>요즘 뜨는 스터디</h1>
      <GridBox></GridBox>
      <MoreButton>더보기</MoreButton>
    </Frame>
  );
};

export default HotStudy;
