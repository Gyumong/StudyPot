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
  UserImgBox,
  UserName,
  Date,
  JoinButton,
  MainBox,
} from "./styles";

import { LocationPin } from "@styled-icons/entypo";
import { PeopleFill } from "@styled-icons/bootstrap/PeopleFill";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JoinStudy, LikeStudy } from "@lib/slices/StudySlice";
import StudyMemberBox from "./../StudyMemberBox/index";
import { useRouter } from "next/router";
import { RootState } from "@lib/store/configureStore";
interface StudyCardProps {
  studyId?: number;
  studyData: any;
}

const StudyModal: React.FC<StudyCardProps> = ({ studyData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.users);
  const { singleStudy } = useSelector((state: RootState) => state.study);
  const [LikeStudyNum, setLikeStudyNum] = useState(0);
  const router = useRouter();
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    return () => {
      setLikeStudyNum(0);
    };
  }, []);
  const AddLike = useCallback(() => {
    if (user && studyData && !!!LikeStudyNum) {
      dispatch(
        LikeStudy({
          studyId: studyData.studyId,
        }),
      );
      setLikeStudyNum((prev) => prev + 1);
    } else if (!user) {
      router.push("/login");
    }
  }, [user, dispatch, studyData, LikeStudyNum]);

  if (!studyData) {
    return null;
  }
  console.log(!!!LikeStudyNum);
  return (
    <BoxModel onClick={stopPropagation}>
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
                <LikeButton onClick={AddLike}>💚 &nbsp; {singleStudy.studyLikeCount + LikeStudyNum}</LikeButton>
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

          <StudyMemberBox studyData={studyData} />
        </MainBox>
      </SettingBox>
    </BoxModel>
  );
};

export default StudyModal;
