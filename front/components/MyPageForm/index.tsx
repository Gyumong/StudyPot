import React, { ReactElement } from "react";
import { MypageFormBlock, StudyList, StudyListBox, StudyName, StudyDetail } from "./styles";
import Profile from "@components/Profile"

const MyPageForm = (): ReactElement => {
  

  return (
    <MypageFormBlock>
      <Profile/>
  
      <StudyList>
          <p>내스터디</p>
          <button>수정</button>
      </StudyList>
      <StudyListBox>
            <StudyName>디스코드 캠스터디</StudyName>
            <StudyDetail>디스코드로 캠 켜고 같이 공부해요! 얼굴은 안나오고 손만 켤...</StudyDetail>
      </StudyListBox>
    

  
      <StudyList>
          <p>관심 스터디</p>
          <button>수정</button>
      </StudyList>
      <StudyListBox>
            <StudyName>디스코드 캠스터디</StudyName>
            <StudyDetail>디스코드로 캠 켜고 같이 공부해요! 얼굴은 안나오고 손만 켤...</StudyDetail>
      </StudyListBox>
  
    
    </MypageFormBlock>
  );
};

export default MyPageForm;
