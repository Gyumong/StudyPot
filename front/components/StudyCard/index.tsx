import React from "react";
import {
  BoxModel,
  SettingBox,
  Shrink,
  TextBox,
  Category,
  TitleBox,
  Title,
  Detail,
  LikeButton,
  LocationButton,
  UserNameBox,
  UserImgBox,
  UserName,
  Date,
  JoinButton,
} from "./styles";

import { LocationPin } from "@styled-icons/entypo";
import { PeopleFill } from "@styled-icons/bootstrap/PeopleFill";

const StudyCard = () => {
  return (
    <BoxModel>
      <SettingBox>
        <Shrink>
          <img
            src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
            alt="mountains"
            className="w-full h-64 rounded-lg rounded-b-none"
          />
        </Shrink>
        <TextBox>
          <Category>자격증/시험</Category>
          <LocationButton>
            <LocationPin size="18" title="Location icon" />
            서울특별시 강남구
          </LocationButton>

          <TitleBox>
            <Title>인문학,심리학,뇌과학 같이 공부하실분</Title>
            <LikeButton>💚 &nbsp; 2</LikeButton>
          </TitleBox>

          <Detail>인문학, 심리학, 뇌과학 관심있고 공부하실분들 매일 공부한것 인증샷 게시판에 올려주세요.</Detail>

          <UserNameBox>
            <UserImgBox>
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                alt="avatar"
              />
            </UserImgBox>
            <div>
              <UserName> 윤겸 </UserName>
              <Date> 14 Aug </Date>
            </div>
            <JoinButton>
              {" "}
              <PeopleFill size="20" />
              &nbsp; 3 / 19
            </JoinButton>
          </UserNameBox>
        </TextBox>
      </SettingBox>
    </BoxModel>
  );
};

export default StudyCard;
