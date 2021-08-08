import React, { ReactElement } from "react";
import { MypageFormBlock, StudyList, StudyListBox, StudyName, StudyDetail } from "./styles";
import Profile from "@components/Profile";
import { useSelector } from "react-redux";
import { RootState } from "@lib/slices";

const MyPageForm = (): ReactElement => {
  const { user } = useSelector((state: RootState) => state.users);

  return (
    <MypageFormBlock>
      <Profile />

      <StudyList>
        <p>내스터디</p>
        <button>수정</button>
      </StudyList>

      {user.participatingStudyList &&
        user.participatingStudyList.map((study: any) => {
          return (
            <StudyListBox key={study.studyId}>
              <StudyName>{study.studyTitle}</StudyName>
              <StudyDetail>{study.studyContent}</StudyDetail>
            </StudyListBox>
          );
        })}

      <StudyList>
        <p>관심 스터디</p>
        <button>수정</button>
      </StudyList>

      {user.interestingStudyList &&
        user.interestingStudyList.map((study: any) => {
          return (
            <StudyListBox key={study.studyId}>
              <StudyName>{study.studyTitle}</StudyName>
              <StudyDetail>{study.studyContent}</StudyDetail>
            </StudyListBox>
          );
        })}
    </MypageFormBlock>
  );
};

export default MyPageForm;
