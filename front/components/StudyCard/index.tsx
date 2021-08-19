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
  Date as DateSpan,
  JoinButton,
} from "./styles";

import { LocationPin } from "@styled-icons/entypo";
import { PeopleFill } from "@styled-icons/bootstrap/PeopleFill";
import { LoadOneStudy } from "@lib/slices/StudySlice";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { contentArray } from "@lib/slices/StudySlice";
import { popModal } from "@lib/slices/ModalSlice";
interface StudyCardProps {
  studyId: number;
  study: contentArray;
}

const icon = {
  like: "💚",
  unlike: "💛",
};

const StudyCard: React.FC<StudyCardProps> = ({ studyId, study }) => {
  const dispatch = useDispatch();
  const exampleOnClick = useCallback(() => {
    dispatch(popModal(null));
    dispatch(
      LoadOneStudy({
        studyId: studyId,
      }),
    );
  }, [dispatch]);

  const formatDate = (date: Date) => {
    const monthTexts: Array<string> = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${new Date(date).getDate()} ${monthTexts[new Date(date).getMonth()]}`;
  };

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
            <LikeButton>
              {study.studyLike.like ? icon.like : icon.unlike}&nbsp;{study.studyLike.likeCount}
            </LikeButton>
          </TitleBox>

          <Detail>{study.content}</Detail>

          <UserNameBox>
            <UserImgBox>
              <img src={study.leader.imageUrl} alt="avatar" />
            </UserImgBox>
            <div>
              <UserName>{study.leader.name}</UserName>
              <DateSpan>{formatDate(study.createdAt)}</DateSpan>
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
