/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useCallback, useState } from "react";
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
  // if (userData) {
  //   <div>loading...</div>;
  // }
  return (
    <ProfileEditBlock>
      <Setting>프로필 설정</Setting>
      <ProfileSubmitForm>
        {/* <UserName>{userData?.name} </UserName>
        <Location>{userData?.location}</Location> */}
        <Interest>관심사</Interest>
        <Select isMulti value={FavoriteValue} options={Option} onChange={onChangeFavorite} styles={colourStyles} />
        {/* <SelfIntro>{userData?.introduction}</SelfIntro> */}
        <textarea id="story" name="story">
          It was a dark and stormy night...
        </textarea>
        <EditButton>수정완료</EditButton>
        {/* <img
          src={gravatar.url(userData?.name, { s: "24px", d: "retro" })}
          style={{ width: "70px", height: "70px", position: "absolute", right: 0 }}
        /> */}
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
