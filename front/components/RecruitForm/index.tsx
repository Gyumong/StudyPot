import React, { ReactElement, useCallback, useState, useEffect, useRef } from "react";
import {
  RecruitFormBlock,
  RecruitSubmitForm,
  ImageUploader,
  RecruitFormList,
  StudyName,
  EditButton,
  CategoryFormBlock,
  CategoryList,
  Location,
  HeadCount,
  Type,
  State,
  Description,
} from "./styles";

import { Radio, Select, Cascader, Form, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import axios from "axios";
import { backUrl } from "config/config";
import useInput from "@hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { MakeStudy } from "@lib/slices/StudySlice";
import { useRouter } from "next/router";
import { RootState } from "@lib/store/configureStore";

type IStudyState = "OPEN" | "CLOSE";
type IStudyType = "ONLINE" | "OFFLINE" | "ON_AND_OFFLINE";
const RecruitForm = (): ReactElement => {
  const imageInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
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
  const { MakeStudyLoading, MakeStudySuccess } = useSelector((state: RootState) => state.study);
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

  useEffect(() => {
    if (!MakeStudyLoading && MakeStudySuccess) {
      router.push("/find");
    }
  }, [MakeStudyLoading, MakeStudySuccess]);

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
      //   setStudyThumnail(e.target.files);
      //?????? ????????? ???????????? ????????? forEacth call ?????????
      [].forEach.call(e.target.files, (f) => {
        setStudyThumnail(f);
      });
    },
    [StudyThumbnail],
  );

  const onSubmitMakeStudy = useCallback(() => {
    const formData = new FormData();
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
    dispatch(MakeStudy(formData));
  }, [StudyTitle, StudyContent, StudyState, StudyType, MaxMember, LocatedAt, selectedValue, StudyThumbnail]);

  const { Option } = Select;

  return (
    <RecruitFormBlock>
      <RecruitSubmitForm encType="multipart/form-data" onFinish={onSubmitMakeStudy}>
        <ImageUploader onClick={onClickImageUpload}>
          <p
            style={{ width: "15rem", marginBottom: "0", color: "#70e0a8", fontSize: "3rem" }}
            className="ant-upload-drag-icon"
          >
            <InboxOutlined />
          </p>
          <input onChange={handleChangeImage} type="file" hidden ref={imageInput} />
        </ImageUploader>

        <StudyName>
          <RecruitFormList>??????</RecruitFormList>

          <Input style={{ width: "13rem", height: "2rem" }} value={StudyTitle} onChange={handleChangeStudyTitle} />
        </StudyName>

        <CategoryFormBlock>
          <CategoryList>????????????</CategoryList>

          <Form.Item style={{ width: "13rem" }}>
            <Select mode="multiple" placeholder="????????? ??????" onChange={handleChangeCategories}>
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
        </CategoryFormBlock>

        <Location>
          <RecruitFormList>??????</RecruitFormList>

          <Form.Item style={{ width: "13rem" }}>
            <Cascader
              placeholder="?????? ??????"
              onChange={handleChangeLocatedAt}
              options={[
                {
                  value: "???????????????",
                  label: "???????????????",
                  children: [
                    {
                      value: "?????????",
                      label: "?????????",
                    },
                    {
                      value: "?????????",
                      label: "?????????",
                    },
                    {
                      value: "?????????",
                      label: "?????????",
                    },
                    {
                      value: "?????????",
                      label: "?????????",
                    },
                    {
                      value: "?????????",
                      label: "?????????",
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
        </Location>

        <HeadCount>
          <RecruitFormList>????????????</RecruitFormList>
          <Form.Item style={{ width: "13rem" }}>
            <Select placeholder="?????????" onChange={handleChangeMaxMember}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>
        </HeadCount>

        <Type>
          <RecruitFormList>??????</RecruitFormList>
          <Radio.Group
            optionType={"button"}
            buttonStyle={"outline"}
            defaultValue={StudyType}
            size={"middle"}
            options={["ONLINE", "OFFLINE", "ON/OFFLINE"]}
            onChange={handleChangeStudyType}
          />
        </Type>

        <State>
          <RecruitFormList>??????</RecruitFormList>
          <Radio.Group
            optionType={"button"}
            buttonStyle={"outline"}
            defaultValue={StudyState}
            size={"middle"}
            options={["OPEN", "CLOSE"]}
            onChange={handleChangeStudyState}
          />
        </State>

        <Description> ????????? ??????</Description>

        <Input.TextArea value={StudyContent} onChange={handleChangeStudyContent} />

        <EditButton>??????</EditButton>
      </RecruitSubmitForm>
    </RecruitFormBlock>
  );
};

export default RecruitForm;
