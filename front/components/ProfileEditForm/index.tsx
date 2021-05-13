import React, { ReactElement} from "react";
import { ProfileEditBlock, Setting, ProfileSubmitForm, Location, Interest, UserName, SelfIntro, EditButton, AccountSettingBlock, AccountSetting, ChangePassword, DeletedAccount } from "./styles";
import Link from 'next/link';
import Image from 'react-bootstrap/Image';

import {LocationPin} from '@styled-icons/entypo/LocationPin';
import {LightningFill} from '@styled-icons/bootstrap/LightningFill';

const ProfileEditForm = (): ReactElement => {
 
  
  return (
    <ProfileEditBlock>
      <Setting>프로필 설정</Setting>
          <ProfileSubmitForm>
            <UserName> 이름 </UserName>
            <Location>지역</Location>
            <Interest>관심사</Interest>
            <SelfIntro>자기소개</SelfIntro>
            <textarea id="story" name="story">It was a dark and stormy night...
            </textarea>
            <EditButton>수정완료</EditButton>
            <Image src="{user && user.photoURL}" 
                style={{width: '70px', height: '70px', position:'absolute', right: 0}}
                roundedCircle />
          </ProfileSubmitForm>
        <Setting>계정 설정</Setting>

        <AccountSettingBlock>

          <AccountSetting>
            <ChangePassword>
              <p>
              비밀번호 변경
              </p>
              <button>변경하기</button>
            </ChangePassword>
            <DeletedAccount>
              <p>
              서비스 탈퇴
              </p>
              <button>탈퇴하기</button>
            </DeletedAccount>
          </AccountSetting>

        </AccountSettingBlock>
    </ProfileEditBlock>
  );
};

export default ProfileEditForm;
