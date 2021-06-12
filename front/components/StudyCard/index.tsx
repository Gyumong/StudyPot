import React from "react";
import {
    BoxModel,
    SettingBox,
    Shrink,
    TextBox,
    Category,
    Title,
    Detail,
    LocationBox,
    LocationButton,
    LikeButton,
    UserNameBox,
    UserName,
    Date,
    JoinButton 
  } from "./styles";
  
  import { LocationPin } from "@styled-icons/entypo/LocationPin";

const StudyCard = () => {
 
    return (
       
        <BoxModel>
                <SettingBox>
                    <Shrink>
                        <img src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg" alt="mountains" className="w-full h-64 rounded-lg rounded-b-none"/>
                    </Shrink>
                    <TextBox>

                        <Category>자격증/시험</Category>
                             <LocationButton>
                                <LocationPin size="18" title="Location icon" />
                                서울특별시 강남구
                            </LocationButton>
                            
                           
                            <Title>
                                인문학,심리학,뇌과학 같이 공부하실분 
                            </Title>
                            
                           
                            
                       
                            <Detail>
                            인문학, 심리학, 뇌과학 관심있고 공부하실분들 매일 공부한것 인증샷 게시판에 올려주세요.
                            </Detail>

                            <LocationBox>
                                
                                <LikeButton>
                                   
                                </LikeButton>
                            </LocationBox>
                            
                        <UserNameBox>
                            <div className="user-logo">
                                <img className="w-12 h-12 object-cover rounded-full mx-4  shadow" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar"/>
                            </div>
                            <div>
                                <UserName> 윤겸 </UserName>
                                <Date> 14 Aug </Date>
                            </div>
                            <JoinButton>참여하기</JoinButton>
                        </UserNameBox>
                    </TextBox>
                </SettingBox>
            </BoxModel>
  );
};

export default StudyCard;
