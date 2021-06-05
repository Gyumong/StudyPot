/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useCallback, useState } from "react";
import {
  ProfileEditBlock,
  Setting,
  ProfileSubmitForm,
  Location,
  LocationView,
  InterestBox,
  Interest,
  UserName,
  UserNameView,
  SelfIntro,
  EditButton,
  ProfileInputBox,
  AccountSettingBlock,
  AccountSetting,
  AccountSettingButton,
  ChangePassword,
  DeletedAccount,
  colourStyles,
} from "./styles";
import gravatar from "gravatar";

import useMyInfo from "@hooks/useMyInfo";
import Select, { ActionMeta, ValueType } from "react-select";

type IOptionType = { label: string; value: number; color?: string; isFixed?: boolean; isDisabled?: boolean };
type IsMulti = true | false;
const FavoriteOptions: IOptionType[] = [
  { label: "IT", value: 1 },
  { label: "Front", value: 2 },
  { label: "IOS", value: 3 },
  { label: "Back", value: 3 },
];
const Option: IOptionType[] = [
  { value: 1, label: "IT", color: "#00B8D9", isFixed: true },
  { value: 2, label: "Front", color: "#0052CC", isDisabled: true },
  { value: 3, label: "React", color: "#5243AA" },
  { value: 4, label: "Java", color: "#FF5630", isFixed: true },
  { value: 5, label: "IOS", color: "#FF8B00" },
  { value: 6, label: "NodeJS", color: "#FFC400" },
  { value: 7, label: "NextJS", color: "#36B37E" },
  { value: 8, label: "A", color: "#00875A" },
  { value: 9, label: "B", color: "#253858" },
  { value: 10, label: "C", color: "#666666" },
];

const ProfileEditForm = (): ReactElement => {
  const [userData] = useMyInfo();
  const [FavoriteValue, setFavoriteValue] = useState([] as IOptionType[]);
  const onChangeFavorite = useCallback(
    (value: ValueType<IOptionType, IsMulti>, _: ActionMeta<IOptionType>) => {
      setFavoriteValue(value as IOptionType[]);
    },
    [FavoriteValue],
  );
  console.log(FavoriteValue);

  if (userData) {
    <div>loading...</div>;
  }

  return (
    <ProfileEditBlock>
      <Setting>프로필 설정</Setting>

      <ProfileSubmitForm>
        <ProfileInputBox>
          <UserName>
            <span>이름</span>
            <UserNameView>{userData?.name}</UserNameView>
          </UserName>

          <Location>
            <span>지역</span>

            <LocationView> {userData?.location} </LocationView>
          </Location>



           <img
            src={gravatar.url(userData?.name, { s: "24px", d: "monsterid" })}
            style={{ width: "70px", height: "70px", position: "absolute", right: 0 }}
          /> 

          <InterestBox>
            <Interest>관심사</Interest>
            <Select isMulti value={FavoriteValue} options={Option} onChange={onChangeFavorite} styles={colourStyles} />
          </InterestBox>

          <SelfIntro> 자기소개{userData?.introduction}</SelfIntro>

          <textarea id="story" name="story">
            It was a dark and stormy night...
          </textarea>

          <EditButton>수정완료</EditButton>
        </ProfileInputBox>
      </ProfileSubmitForm>

      <Setting>계정 설정</Setting>

      <AccountSettingBlock>
        <AccountSetting>
          <ChangePassword>
            <p>비밀번호 변경</p>
            <AccountSettingButton>변경하기</AccountSettingButton>
          </ChangePassword>
          <DeletedAccount>
            <p>서비스 탈퇴</p>
            <AccountSettingButton>탈퇴하기</AccountSettingButton>
          </DeletedAccount>
        </AccountSetting>
      </AccountSettingBlock>
    </ProfileEditBlock>
  );
};

export default ProfileEditForm;
