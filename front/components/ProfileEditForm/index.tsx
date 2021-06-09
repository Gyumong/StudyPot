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
import Select, { ActionMeta, ValueType } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";
import { backUrl } from "config/config";
import axios from "axios";

type IOptionType = { label: string; value: number; color?: string };
type IsMulti = true | false;

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
            <Select
              isMulti
              value={FavoriteValue}
              options={defaultValue}
              onChange={onChangeFavorite}
              styles={colourStyles}
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
