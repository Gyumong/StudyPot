import React, { useCallback, useState, useEffect } from "react";
import {
  MemberBox,
  InnerTop,
  InnerMiddle,
  InnerBottom,
  MemberButton,
  ApplyButton,
  BackGround,
} from "../StudyModal/styles";
import { useDispatch, useSelector } from "react-redux";
import { JoinStudy } from "@lib/slices/StudySlice";
import { RootState } from "@lib/slices";
import { LoadStudyMembers } from "./../../lib/slices/StudySlice";
import { MemberList, InnerMiddleMemberBox, MemberBackGround, MemberImgBox, MemberDesc } from "./styles";
interface StudyProMemberBoxProps {
  studyData: any;
}
const StudyMemberBox: React.FC<StudyProMemberBoxProps> = ({ studyData }) => {
  const [joinPending, setJoinPending] = useState(false);
  console.log(studyData);
  const dispatch = useDispatch();
  const { joinStudyLoading, joinStudySuccess, studyMembers } = useSelector((state: RootState) => state.study);
  useEffect(() => {
    if (!joinStudyLoading && joinStudySuccess) {
      setJoinPending(true);
    }
  }, [joinStudyLoading, joinStudySuccess, joinPending]);
  useEffect(() => {
    dispatch(
      LoadStudyMembers({
        studyId: studyData?.studyId,
      }),
    );
  }, [studyData]);

  const onClickJoinStudy = useCallback(
    (e) => {
      if (studyData) {
        dispatch(
          JoinStudy({
            studyId: studyData?.studyId,
          }),
        );
      }
    },
    [studyData],
  );

  if (studyMembers?.isMember) {
    return (
      <MemberBox>
        <MemberBackGround>
          <InnerTop>
            <MemberButton>스터디멤버</MemberButton>
            <MemberButton>일정</MemberButton>
            <MemberButton>게시판</MemberButton>
          </InnerTop>

          <InnerMiddleMemberBox>
            <MemberList>
              <MemberImgBox>
                <img
                  src={studyMembers?.studyMemberList[0].imageUrl}
                  alt="mountains"
                  className="w-full h-64 rounded-lg rounded-b-none"
                />
              </MemberImgBox>
              <MemberDesc>{studyMembers?.studyMemberList[0].userName}</MemberDesc>
            </MemberList>
            <MemberList>
              <MemberImgBox>
                <img
                  src={studyMembers?.studyMemberList[0].imageUrl}
                  alt="mountains"
                  className="w-full h-64 rounded-lg rounded-b-none"
                />
              </MemberImgBox>
              <MemberDesc>{studyMembers?.studyMemberList[0].userName}</MemberDesc>
            </MemberList>
            <MemberList>
              <MemberImgBox>
                <img
                  src={studyMembers?.studyMemberList[0].imageUrl}
                  alt="mountains"
                  className="w-full h-64 rounded-lg rounded-b-none"
                />
              </MemberImgBox>
              <MemberDesc>{studyMembers?.studyMemberList[0].userName}</MemberDesc>
            </MemberList>
          </InnerMiddleMemberBox>
        </MemberBackGround>
      </MemberBox>
    );
  }
  return (
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
          <ApplyButton onClick={onClickJoinStudy}>{joinPending ? "대기중" : "참여하기"}</ApplyButton>
        </InnerBottom>
      </BackGround>
    </MemberBox>
  );
};

export default StudyMemberBox;
