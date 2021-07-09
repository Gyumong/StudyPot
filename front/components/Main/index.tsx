import React from "react";
import {
    Frame,
    CopyButtonBox,
    CopyBox,
    MainCopy,
    SubCopy,
    ButtonBox,
    ServiceButton,
    MakeButton,
    MainImage
    
  } from "./styles";


const Main = () => {
 
    return (
       <Frame>
           <CopyButtonBox>
                <CopyBox>
                        <MainCopy>
                            <span>스터디팟</span> 은 오직 그룹 스터디 활동을 위해 만들어진 플랫폼입니다.
                        </MainCopy>
                        <SubCopy>
                            <span>진짜 스터디 찾으시나요? </span>
                            <span>스터디팟에서 당신이 생각한 스터디를 열어보세요.</span>
                        </SubCopy>
                </CopyBox>
                <ButtonBox>
                    <ServiceButton>서비스 소개</ServiceButton>
                    <MakeButton>스터디 만들기</MakeButton>
                </ButtonBox>
           </CopyButtonBox>
        
          
            <MainImage src = "/typo_350x1900_lotate_main_logo_studypot.png" alt="main image" width={350} height={1500}/>
          
       </Frame>
            
  );
};

export default Main;
