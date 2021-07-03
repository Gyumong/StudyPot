/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useCallback, useState, useEffect, useRef } from "react";
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
import { useRouter } from "next/router";
import { Select, Cascader, Form, Input, Tag } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loadUserByToken, UpdateUserProfile } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";
import { backUrl } from "config/config";
import axios from "axios";
import useInput from "@hooks/useInput";

interface IdefaultValue {
  [key: string]: string;
}

const ProfileEditForm = (): ReactElement => {
  const router = useRouter();
  const { Option } = Select;
  const imageInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state: RootState) => state.users);
  const [defaultValue, setDefaultValue] = useState<Array<IdefaultValue>>([]);
  const [UserImage, setUserImage] = useState<Blob>();
  const [selectedValue, setSelectedValue] = useState([]);
  const [ChangeUserName, handleChangeUserName] = useInput("");
  const [지역, set지역] = useState([]);
  const [Introduction, setIntroduction] = useState("");

  useEffect(() => {
    dispatch(loadUserByToken(null));
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(`${backUrl}/categories`);
        const defaultCategoriesValue = data;
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

  const onClickImageUpload = useCallback(() => {
    if (imageInput?.current) {
      imageInput.current.click();
    }
  }, [imageInput.current]);

  const handleChangeImage = useCallback(
    (e) => {
      e.preventDefault();
      console.log("dddd");
      console.log("image", e.target.files[0]);
      //   setStudyThumnail(e.target.files);
      //유사 배열을 배열처럼 쓰려고 forEacth call 빌려옴
      [].forEach.call(e.target.files, (f) => {
        setUserImage(f);
      });
    },
    [UserImage],
  );

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    if (UserImage !== undefined) {
      formData.append("image", UserImage);
    }
    formData.append("location", 지역[1]);
    formData.append("introduction", Introduction);
    formData.append("name", ChangeUserName);
    for (const categorie of selectedValue) {
      formData.append("categories", categorie);
    }
    dispatch(UpdateUserProfile(formData));
    // router.push("/mypage");
  }, [ChangeUserName, 지역, Introduction, selectedValue, UserImage]);

  return (
    <ProfileEditBlock>
      <Setting>프로필 설정</Setting>

      <AccountSetting encType="multipart/form-data" onFinish={onSubmit}>
        <ProfileImage>
          <input type="file" ref={imageInput} hidden onChange={handleChangeImage} />
          <button onClick={onClickImageUpload}>이미지 업로드</button>
        </ProfileImage>
        <ProfileListBlock>
          <ProfileSettingList>이름</ProfileSettingList>
          <Input style={{ width: "50%", height: "2rem" }} value={ChangeUserName} onChange={handleChangeUserName} />
        </ProfileListBlock>
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
                  return <Option value={e.key}>{e.value}</Option>;
                })}
            </Select>
          </Form.Item>
        </ProfileListBlock>

        <SelfIntro> 자기소개</SelfIntro>
        <Input.TextArea style={{ width: "90%" }} value={Introduction} onChange={handleChange자기소개} />

        <EditButton>수정완료</EditButton>
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
