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
    ApplyButton

  } from "./styles";
  
  import { LocationPin } from "@styled-icons/entypo";
  import { PeopleFill } from "@styled-icons/bootstrap/PeopleFill";

  interface StudyCardProps {
    studyId: number;
  }
  
  const StudyModal: React.FC<StudyCardProps> = ({}) => {
    
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
        <MainBox>
          <TextBox>
             <Top> 
                <Category>자격증/시험</Category>
                <LocationButton>
                <LocationPin size="18" title="Location icon" />
                서울특별시 강남구
                </LocationButton>
    
                <TitleBox>
                <Title>인문학,심리학,뇌과학 같이 공부하실분</Title>
                <LikeButton>💚 &nbsp; 2</LikeButton>
                </TitleBox>
            </Top>
            
            <Detail>인문학, 심리학, 뇌과학 관심있고 공부하실분들 매일 공부한것 인증샷 게시판에 올려주세요.</Detail>
  
            <Bottom>

                <UserBox>
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
                </UserBox>

              <JoinButton>
                {" "}
                <PeopleFill size="20" />
                &nbsp; 3 / 19
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
  