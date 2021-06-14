/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useCallback, useState, useEffect } from "react";
import {
  ProfileEditBlock,
  Setting,
  AccountSetting,
  AccountSettingButton,
  ChangePassword,
  DeletedAccount,
  ProfileSettingList,
  ProfileListBlock,
  SelfIntro,
  EditButton,
  ProfileImage,
  ImageEdit,
  colors,
} from "./styles";

import { Select, Cascader, Form, Input, Tag } from "antd";
import "antd/dist/antd.css";
import gravatar from "gravatar";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken, UpdateUserProfile } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";
import { backUrl } from "config/config";
import axios from "axios";
import useInput from "@hooks/useInput";

const ProfileEditForm = (): ReactElement => {
  const { Option } = Select;

  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.users?.user);
  const [defaultValue, setDefaultValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);

  const [ChangeUserName, setChangeUserName] = useInput("");
  const [지역, set지역] = useState("");
  const [Introduction, setIntroduction] = useState("");

  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(`${backUrl}/categories`);
        const defaultCategoriesValue = data.map((e: { value: string }) => e.value);
        console.log(defaultCategoriesValue);
        setDefaultValue(defaultCategoriesValue);
      } catch (e) {
        console.log("getCategories Error", e);
      }
    }
    getCategories();
  }, []);

  const handleChange관심사 = useCallback(
    (value) => {
      setSelectedValue(value);
      console.log(value);
      console.log(selectedValue);
    },
    [selectedValue],
  );
  const handleChange자기소개 = useCallback((e) => {
    setIntroduction(e.target.value);
    console.log(e.target.value);
  }, []);
  const handleChange지역 = useCallback((value) => {
    set지역(value);
    console.log(value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(ChangeUserName, 지역, Introduction, selectedValue);
    },
    [ChangeUserName, 지역, Introduction, selectedValue],
  );

  return (
    <ProfileEditBlock>
      <Setting>프로필 설정</Setting>

      <AccountSetting>
        <ProfileListBlock>
          <ProfileSettingList>이름</ProfileSettingList>
          <Input style={{ width: "50%", height: "2rem" }} value={ChangeUserName} onChange={setChangeUserName} />
        </ProfileListBlock>

        {/* <ProfileImage> 
            <ImageEdit>
              <img id="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Souvenir_silhouette_post_card._Toledo%27s_greatest_store%3B_Tiedtke%27s._The_store_for_all_the_people_-_DPLA_-_f00a78fe61c216236a13cdebf588d3c3_%28page_1%29.jpg/220px-Souvenir_silhouette_post_card._Toledo%27s_greatest_store%3B_Tiedtke%27s._The_store_for_all_the_people_-_DPLA_-_f00a78fe61c216236a13cdebf588d3c3_%28page_1%29.jpg" />
            </ImageEdit>
            <button>사진 바꾸기</button>
          </ProfileImage>  */}

        <ProfileListBlock>
          <ProfileSettingList>지역</ProfileSettingList>
          <Form.Item style={{ width: "50%" }}>
            <Cascader
              placeholder="지역 설정"
              onChange={handleChange지역}
              options={[
                {
                  value: "서울특별시",
                  label: "서울특별시",
                  children: [
                    {
                      value: "강남구",
                      label: "강남구",
                    },
                    {
                      value: "강동구",
                      label: "강동구",
                    },
                    {
                      value: "강북구",
                      label: "강북구",
                    },
                    {
                      value: "강서구",
                      label: "강서구",
                    },
                    {
                      value: "관악구",
                      label: "관악구",
                    },
                  ],
                },
                {
                  value: "부산광역시",
                  label: "부산광역시",
                  children: [
                    {
                      value: "강서구",
                      label: "강서구",
                    },
                    {
                      value: "금정구",
                      label: "금정구",
                    },
                    {
                      value: "기장군",
                      label: "기장군",
                    },
                    {
                      value: "남구",
                      label: "남구",
                    },
                    {
                      value: "동구",
                      label: "동구",
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
        </ProfileListBlock>

        <ProfileListBlock>
          <ProfileSettingList>관심사</ProfileSettingList>
          <Form.Item style={{ width: "50%" }}>
            <Select mode="multiple" placeholder="관심사 설정" onChange={handleChange관심사}>
              {defaultValue &&
                defaultValue.map((e) => {
                  return <Option value={e}>{e}</Option>;
                })}
            </Select>
          </Form.Item>
        </ProfileListBlock>

        <SelfIntro> 자기소개</SelfIntro>
        <Input.TextArea style={{ width: "90%" }} value={Introduction} onChange={handleChange자기소개} />

        <EditButton onClick={onSubmit}>수정완료</EditButton>
      </AccountSetting>

      <Setting>계정 설정</Setting>

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
    </ProfileEditBlock>
  );
};

export default ProfileEditForm;
