import React, { ReactElement, useCallback, useState } from "react";
import { 
    RecruitFormBlock,
    RecruitSubmitForm, 
    RecruitFormList, 
    StudyName, 
    EditButton,
    Category,
    Location,
    HeadCount,
    Type,
    State,
    Description,
     } from "./styles";


import { Radio, Upload, message, Select, Cascader, Form, Input, } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from "axios";


 const RecruitForm = (): ReactElement => {


    const [imageUrl, setImageUrl] = useState("");

    const setFile = (e) => {
        if (e.target.files[0]) {
          const img = new FormData();
          img.append("file", e.target.files[0]);
          axios
            .post("http://localhost:3000/", img)
            .then((res) => {
              setImageUrl(res.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      };

    

    const { Option } = Select;

    const { Dragger } = Upload;

    const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info:any) {
        const { status } = info.file;
        if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e:any) {
        console.log('Dropped files', e.dataTransfer.files);
    },
    };

  return (
    <RecruitFormBlock>
       
        <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined/>
                </p>
                <p className="ant-upload-text">이미지 업로드를 위해 해당 영역을 클릭하거나 파일을 드레그 하세요</p>
                <img src={imageUrl}/>
                <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
                </p>
            </Dragger>
        

                <RecruitSubmitForm>
                    <StudyName>
                     <RecruitFormList>제목</RecruitFormList>
                        <Input style={{ width: '40%', height: '2rem' }}/>
                    </StudyName>

                    <Category>
                     <RecruitFormList>카테고리</RecruitFormList>

                     <Form.Item  style={{ width: '40%' }}>        
                        <Select mode="multiple" placeholder="카테고리 설정">
                            <Option value="red">Red</Option>
                            <Option value="green">Green</Option>
                            <Option value="blue">Blue</Option>
                        </Select>
                    </Form.Item>

                    </Category>

                    
                    <Location>
                    <RecruitFormList>지역</RecruitFormList>

                    <Form.Item  style={{ width: '40%' }}>
                        <Cascader 
                            placeholder="지역 설정"
                            options={[
                            {
                                value: '서울특별시',
                                label: '서울특별시',
                                children: [
                                {
                                    value: '강남구',
                                    label: '강남구',
                                },
                                {
                                    value: '강동구',
                                    label: '강동구',
                                },
                                {
                                    value: '강북구',
                                    label: '강북구',
                                },
                                {
                                    value: '강서구',
                                    label: '강서구',
                                },
                                {
                                    value: '관악구',
                                    label: '관악구',
                                },
                                ],
                            },
                            {
                                value: '부산광역시',
                                label: '부산광역시',
                                children: [
                                {
                                    value: '강서구',
                                    label: '강서구',
                                },
                                {
                                    value: '금정구',
                                    label: '금정구',
                                },
                                {
                                    value: '기장군',
                                    label: '기장군',
                                },
                                {
                                    value: '남구',
                                    label: '남구',
                                },
                                {
                                    value: '동구',
                                    label: '동구',
                                },
                                ],
                            },
                            ]}
                        />
                    </Form.Item>
                    
                    </Location>

                    <HeadCount>
                        <RecruitFormList>인원설정</RecruitFormList>
                        <Form.Item  style={{ width: '40%' }}>
                            <Select placeholder="인원수">
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                        </Form.Item>
                    </HeadCount>

                    <Type>
                        <RecruitFormList>타입</RecruitFormList>
                        <Radio.Group  optionType={'button'} buttonStyle={'outline'} defaultValue={'Online'} size={'middle'} options={['Online', 'Offline','On/Offline']} />
                    
                    </Type>

                    <State>
                        <RecruitFormList>상태</RecruitFormList>
                        <Radio.Group optionType={'button'} buttonStyle={'outline'} defaultValue={'Open'} size={'middle'} options={['Open', 'Close']} />
                      
                    </State>
            
                    <Description> 스터디 설명</Description>

                    <Input.TextArea />

                    <EditButton>등록</EditButton>
                </RecruitSubmitForm>
           
    </RecruitFormBlock>
  );
};

export default RecruitForm;
