import React, { ReactElement, useCallback, useState, useEffect, useRef } from "react";
import {
  RecruitFormBlock,
  RecruitSubmitForm,
  RecruitFormList,
  StudyName,
  EditButton,
  CategoryBlock,
  Location,
  HeadCount,
  Type,
  State,
  Description,
} from "./styles";

import { Radio, Upload, message, Select, Cascader, Form, Input } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { backUrl } from "config/config";
import useInput from "@hooks/useInput";
import { useDispatch } from "react-redux";
import { MakeStudy } from "@lib/slices/StudySlice";

type IStudyState = "OPEN" | "CLOSE";
type IStudyType = "ONLINE" | "OFFLINE" | "ON_AND_OFFLINE";
const RecruitForm = (): ReactElement => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [StudyTitle, handleChangeStudyTitle] = useInput("");
  const [defaultValue, setDefaultValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [LocatedAt, setLocatedAt] = useState([]);
  const [MaxMember, setMaxMember] = useState("");
  const [StudyType, setStudyType] = useState("ONLINE");
  const [StudyState, setStudyState] = useState("OPEN");
  const [StudyContent, setStudyContent] = useState("");
  const [StudyThumbnail, setStudyThumnail] = useState<Blob>();

  const dispatch = useDispatch();
  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(`${backUrl}/categories`);
        // const defaultCategoriesValue = data.map((e: { value: string }) => e.value);
        console.log(data);
        setDefaultValue(data);
      } catch (e) {
        console.log("getCategories Error", e);
      }
    }
    getCategories();
  }, []);

  const handleChangeCategories = useCallback(
    (value) => {
      setSelectedValue(value);
      console.log(value);
      console.log(selectedValue);
    },
    [selectedValue],
  );
  const handleChangeMaxMember = useCallback(
    (value) => {
      console.log(value);
      setMaxMember(value);
    },
    [MaxMember],
  );

  const handleChangeStudyType = useCallback(
    (e) => {
      console.log(e.target.value);
      setStudyType(e.target.value);
    },
    [StudyType],
  );

  const handleChangeStudyState = useCallback(
    (e) => {
      console.log(e.target.value);
      setStudyState(e.target.value);
    },
    [StudyState],
  );

  const handleChangeStudyContent = useCallback(
    (e) => {
      console.log(e.target.value);
      setStudyContent(e.target.value);
    },
    [StudyContent],
  );

  const handleChangeLocatedAt = useCallback(
    (value) => {
      console.log(value);
      setLocatedAt(value);
    },
    [LocatedAt],
  );
  const onClickImageUpload = useCallback(() => {
    if (imageInput?.current) {
      imageInput.current.click();
    }
  }, [imageInput.current]);
  const handleChangeImage = useCallback(
    (e) => {
      const form = new FormData();
      console.log("image", e.target.files[0]);
      //   setStudyThumnail(e.target.files);
      //유사 배열을 배열처럼 쓰려고 forEacth call 빌려옴
      [].forEach.call(e.target.files, (f) => {
        setStudyThumnail(f);
        form.append("image", f);
      });
      form.forEach((value, key) => {
        console.log("key %s: value %s", key, value);
      });
    },
    [StudyThumbnail],
  );

  const onSubmitMakeStudy = useCallback(() => {
    const formData = new FormData();
    console.log(StudyThumbnail);
    formData.append("title", StudyTitle);
    formData.append("categories", selectedValue[0]);
    if (StudyThumbnail !== undefined) {
      formData.append("thumbnail", StudyThumbnail);
    }
    formData.append("locatedAt", LocatedAt[1]);
    formData.append("content", StudyContent);
    formData.append("maxStudyNumber", MaxMember);
    formData.append("meetingType", StudyType);
    formData.append("status", StudyState);
    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
    });
    console.log(formData.has("locatedAt"));
    console.log(formData.has("thumbnail"));
    dispatch(MakeStudy(formData));
    console.log(StudyTitle, StudyContent, StudyState, StudyType, LocatedAt[1], MaxMember, selectedValue);
  }, [StudyTitle, StudyContent, StudyState, StudyType, MaxMember, LocatedAt, selectedValue, StudyThumbnail]);

  const { Option } = Select;

  return (
    <RecruitFormBlock>
      <RecruitSubmitForm encType="multipart/form-data" onFinish={onSubmitMakeStudy}>
        <StudyName>
          <RecruitFormList>제목</RecruitFormList>
          <div style={{ width: "40%", height: "2rem" }}>
            <input type="file" ref={imageInput} hidden onChange={handleChangeImage} />
            <button onClick={onClickImageUpload}>이미지 업로드</button>
          </div>
          <Input style={{ width: "40%", height: "2rem" }} value={StudyTitle} onChange={handleChangeStudyTitle} />
        </StudyName>

        <CategoryBlock>
          <RecruitFormList>카테고리</RecruitFormList>

          <Form.Item style={{ width: "40%" }}>
            <Select mode="multiple" placeholder="관심사 설정" onChange={handleChangeCategories}>
              {defaultValue &&
                defaultValue.map((e: any) => {
                  return (
                    <Option value={e.key} key={e.key}>
                      {e.value}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
        </CategoryBlock>

        <Location>
          <RecruitFormList>지역</RecruitFormList>

          <Form.Item style={{ width: "40%" }}>
            <Cascader
              placeholder="지역 설정"
              onChange={handleChangeLocatedAt}
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
        </Location>

        <HeadCount>
          <RecruitFormList>인원설정</RecruitFormList>
          <Form.Item style={{ width: "40%" }}>
            <Select placeholder="인원수" onChange={handleChangeMaxMember}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>
        </HeadCount>

        <Type>
          <RecruitFormList>타입</RecruitFormList>
          <Radio.Group
            optionType={"button"}
            buttonStyle={"outline"}
            defaultValue={StudyType}
            size={"middle"}
            options={["ONLINE", "Offline", "On/Offline"]}
            onChange={handleChangeStudyType}
          />
        </Type>

        <State>
          <RecruitFormList>상태</RecruitFormList>
          <Radio.Group
            optionType={"button"}
            buttonStyle={"outline"}
            defaultValue={StudyState}
            size={"middle"}
            options={["OPEN", "ClOSE"]}
            onChange={handleChangeStudyState}
          />
        </State>

        <Description> 스터디 설명</Description>

        <Input.TextArea value={StudyContent} onChange={handleChangeStudyContent} />

        <EditButton>등록</EditButton>
      </RecruitSubmitForm>
    </RecruitFormBlock>
  );
};

export default RecruitForm;
