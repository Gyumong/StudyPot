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
import { LoadOneStudy } from "@lib/slices/StudySlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { contentArray } from "@lib/slices/StudySlice";
interface StudyCardProps {
  studyId: number;
  study: contentArray;
}

const StudyCard: React.FC<StudyCardProps> = ({ studyId, study }) => {
  const dispatch = useDispatch();
  const exampleOnClick = useCallback(() => {
    dispatch(
      LoadOneStudy({
        studyId: studyId,
      }),
    );
    console.log(studyId);
  }, []);

  return (
    <BoxModel onClick={exampleOnClick}>
      <SettingBox>
        <Shrink>
          <img src={`${study.thumbnail}`} alt="mountains" className="w-full h-64 rounded-lg rounded-b-none" />
        </Shrink>
        <TextBox>
          {study.categories.map((category) => {
            return <Category key={category.key}>{category.value}</Category>;
          })}
          <LocationButton>
            <LocationPin size="18" title="Location icon" />
            {study.locatedAt}/{study.meetingType}
          </LocationButton>

          <TitleBox>
            <Title>{study.title}</Title>
            <LikeButton>💚 &nbsp; 2</LikeButton>
          </TitleBox>

          <Detail>{study.content}</Detail>

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
              &nbsp; {study.participatingNumber}/ {study.maxNumber}
            </JoinButton>
          </UserNameBox>
        </TextBox>
      </SettingBox>
    </BoxModel>
  );
};

export default StudyCard;
