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
  Top,
  Bottom,
  UserBox,
  BackGround,
  UserImgBox,
  UserName,
  Date,
  JoinButton,
  MemberBox,
  InnerTop,
  InnerMiddle,
  InnerBottom,
  MainBox,
  MemberButton,
  ApplyButton,
} from "./styles";

import { LocationPin } from "@styled-icons/entypo";
import { PeopleFill } from "@styled-icons/bootstrap/PeopleFill";

interface StudyCardProps {
  studyId?: number;
  studyData: any;
}

const StudyModal: React.FC<StudyCardProps> = ({ studyData }) => {
  console.log(studyData);
  if (!studyData) {
    return null;
  }
  return (
    <BoxModel>
      <SettingBox>
        <Shrink>
          <img src={studyData.thumbnailUrl} alt="mountains" className="w-full h-64 rounded-lg rounded-b-none" />
        </Shrink>
        <MainBox>
          <TextBox>
            <Top>
              {studyData.categories.map((category: any) => {
                return <Category key={category.key}>{category.value}</Category>;
              })}

              <LocationButton>
                <LocationPin size="18" title="Location icon" />
                서울특별시 강남구
              </LocationButton>
              <TitleBox>
                <Title>{studyData.title}</Title>
                <LikeButton>💚 &nbsp; 2</LikeButton>
              </TitleBox>
            </Top>

            <Detail>{studyData.content}</Detail>

            <Bottom>
              <UserBox>
                <UserImgBox>
                  <img src={studyData.leader.imageUrl} alt="avatar" />
                </UserImgBox>
                <div>
                  <UserName>{studyData.leader.name} </UserName>
                  <Date> 14 Aug </Date>
                </div>
              </UserBox>

              <JoinButton>
                {" "}
                <PeopleFill size="20" />
                &nbsp; {studyData.participatingNumber} /{studyData.maxStudyNumber}
              </JoinButton>
            </Bottom>
          </TextBox>
          <MemberBox>
            <BackGround>
              <InnerTop>
                <MemberButton>스터디멤버</MemberButton>
                <MemberButton>일정</MemberButton>
                <MemberButton>게시판</MemberButton>
              </InnerTop>

              <InnerMiddle>
                <p>멤버가 되시면 상세 내용을 확인하실 수 있습니다.</p>
              </InnerMiddle>

              <InnerBottom>
                <ApplyButton>참여하기</ApplyButton>
              </InnerBottom>
            </BackGround>
          </MemberBox>
        </MainBox>
      </SettingBox>
    </BoxModel>
  );
};

export default StudyModal;
