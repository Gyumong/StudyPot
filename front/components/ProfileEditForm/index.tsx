import React, { ReactElement } from "react";
import {
  ProfileEditBlock,
  Setting,
  ProfileSubmitForm,
  Location,
  Interest,
  UserName,
  SelfIntro,
  EditButton,
  AccountSettingBlock,
  AccountSetting,
  ChangePassword,
  DeletedAccount,
} from "./styles";
import Link from "next/link";
import gravatar from "gravatar";
import useMyInfo from "@hooks/useMyInfo";

const ProfileEditForm = (): ReactElement => {
  const [userData] = useMyInfo();
  if (userData) {
    <div>loading...</div>;
  }
  return (
    <ProfileEditBlock>
      <Setting>프로필 설정</Setting>
      <ProfileSubmitForm>
        <UserName>{userData?.name} </UserName>
        <Location>{userData?.location}</Location>
        <Interest>관심사</Interest>
        <SelfIntro>{userData?.introduction}</SelfIntro>
        <textarea id="story" name="story">
          It was a dark and stormy night...
        </textarea>
        <EditButton>수정완료</EditButton>
        <img
          src={gravatar.url(userData?.name, { s: "24px", d: "retro" })}
          style={{ width: "70px", height: "70px", position: "absolute", right: 0 }}
        />
      </ProfileSubmitForm>
      <Setting>계정 설정</Setting>

      <AccountSettingBlock>
        <AccountSetting>
          <ChangePassword>
            <p>비밀번호 변경</p>
            <button>변경하기</button>
          </ChangePassword>
          <DeletedAccount>
            <p>서비스 탈퇴</p>
            <button>탈퇴하기</button>
          </DeletedAccount>
        </AccountSetting>
      </AccountSettingBlock>
    </ProfileEditBlock>
  );
};

export default ProfileEditForm;
