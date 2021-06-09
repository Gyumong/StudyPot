/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useCallback, useState, useEffect } from "react";
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
import { ActionMeta, ValueType } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";
import { backUrl } from "config/config";
import axios from "axios";
import AsyncSelect from "react-select/async";

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

const colors = [
  "#00B8D9",
  "#0052CC",
  "#5243AA",
  "#FF5630",
  "#FF8B00",
  "#FFC400",
  "#36B37E",
  "#00875A",
  "#253858",
  "#666666",
];

const ProfileEditForm = (): ReactElement => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.users?.user);
  const [defaultValue, setDefaultValue] = useState();
  useEffect(() => {
    async function getCateories() {
      try {
        const { data } = await axios.get(`${backUrl}/categories`);
        let number = 0;
        for (const i of data) {
          i.label = i.value;
          i.color = colors[number];
          number++;
        }
        console.log(data);
        setDefaultValue(data);
      } catch (e) {
        console.log("error", e);
      }
    }
    getCateories();
  }, []);

  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, []);

  const [FavoriteValue, setFavoriteValue] = useState([] as IOptionType[]);
  const onChangeFavorite = useCallback(
    (value: ValueType<IOptionType, IsMulti>, _: ActionMeta<IOptionType>) => {
      setFavoriteValue(value as IOptionType[]);
    },
    [FavoriteValue],
  );
  console.log(FavoriteValue.length);
  console.log(FavoriteValue);

  return (
    <ProfileEditBlock>
      <Setting>프로필 설정</Setting>

      <ProfileSubmitForm>
        <ProfileInputBox>
          <UserName>
            <span>이름</span>
            <UserNameView>{name}</UserNameView>
          </UserName>
          <Location>
            <span>지역</span>
            <LocationView> </LocationView>
          </Location>
          <img
            src={gravatar.url(name, { s: "24px", d: "monsterid" })}
            style={{ width: "70px", height: "70px", position: "absolute", right: 0 }}
          />

          <InterestBox>
            <Interest>관심사</Interest>
            <AsyncSelect
              isMulti
              value={FavoriteValue}
              options={Option}
              onChange={onChangeFavorite}
              styles={colourStyles}
              defaultValue={defaultValue}
            />
          </InterestBox>

          <SelfIntro> 자기소개</SelfIntro>

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
