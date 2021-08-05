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
  ChangeButton,
  CancleButton,
  ProfileImage,
  CInput,
  CInputForm,
  ButtonGroup,
  Error,
  SelfIntroForm
} from "./styles";
import { useRouter } from "next/router";
import { Select, Cascader, Form, Input } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loadUserByToken, UpdateUserPassword, UpdateUserProfile } from "@lib/slices/UserSlice";
import { RootState } from "@lib/store/configureStore";
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
  const { passwordChangeSuccess, passwordChangeLoading } = useSelector((state: RootState) => state.users);

  const [defaultValue, setDefaultValue] = useState<Array<IdefaultValue>>([]);
  const [UserImage, setUserImage] = useState<Blob>();
  const [selectedValue, setSelectedValue] = useState([]);
  const [ChangeUserName, handleChangeUserName] = useInput("");
  const [지역, set지역] = useState([]);
  const [Introduction, setIntroduction] = useState("");

  const [originalPS, setOriginalPS] = useState("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [psChangeToggle, setpsChangeToggle] = useState(true);
  const [mismatchError, setMismatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
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

  useEffect(() => {
    if ((!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || password.length < 8) && password.length > 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  useEffect(() => {
    if (!passwordChangeLoading && passwordChangeSuccess) {
      setpsChangeToggle((prev) => (prev = true));
      setOriginalPS("");
      setPassword("");
      setPasswordCheck("");
    }
  }, [passwordChangeSuccess, passwordChangeLoading]);

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

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password],
  );

  const onChangeOriginalPS = useCallback(
    (e) => {
      setOriginalPS(e.target.value);
    },
    [originalPS],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      if (password) {
        setMismatchError(e.target.value !== password);
      }
    },
    [password],
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

  const onSubmitChangePassword = useCallback(
    (e) => {
      e.preventDefault();

      if (!passwordError && !mismatchError && originalPS) {
        dispatch(
          UpdateUserPassword({
            changedPassword: password,
            originalPassword: originalPS,
          }),
        );
      }
    },
    [passwordCheck, mismatchError, originalPS],
  );
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

        <SelfIntroForm>
        <SelfIntro> 자기소개</SelfIntro>
        <Input.TextArea style={{ width: "100%" }} value={Introduction} onChange={handleChange자기소개} />
        </SelfIntroForm>

        <EditButton>수정완료</EditButton>
      </AccountSetting>

      <Setting>계정 설정</Setting>

      <AccountSetting>
        <ChangePassword>
          <p>비밀번호 변경</p>
          {psChangeToggle && (
            <AccountSettingButton
              onClick={() => {
                setpsChangeToggle(!psChangeToggle);
              }}
            >
              변경하기
            </AccountSettingButton>
          )}
          {!psChangeToggle && (
            <CInputForm>
              <CInput
                type="password"
                placeholder="현재 비밀번호"
                value={originalPS}
                style={{ margin: "0" }}
                onChange={onChangeOriginalPS}
              />
              <CInput
                type="password"
                placeholder="비밀번호(문자,숫자조합 8자 이상)"
                value={password}
                onChange={onChangePassword}
              />
              <CInput
                type="password"
                placeholder="비밀번호 체크"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              {passwordError && <Error>비밀번호는 문자,숫자조합 8자 이상만 가능합니다.</Error>}
              {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
              <ButtonGroup>
                <ChangeButton onClick={onSubmitChangePassword}>변경하기</ChangeButton>
                <CancleButton
                  onClick={() => {
                    setpsChangeToggle(!psChangeToggle);
                  }}
                >
                  취소
                </CancleButton>
              </ButtonGroup>
            </CInputForm>
          )}
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
