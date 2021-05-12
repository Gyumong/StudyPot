import React, { ReactElement} from "react";
import { ProfileFormBlock, Location, Interest, UserName, SelfIntro, ProfileEditButton } from "./styles";
import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';

import {LocationPin} from '@styled-icons/entypo/LocationPin';
import {LightningFill} from '@styled-icons/bootstrap/LightningFill';

const Profile = (): ReactElement => {
 
  
  return (
    <ProfileFormBlock>
        <UserName>UserName</UserName>
        
        <Location>
          <LocationPin size="28" title="Location icon" />
          <p>서울시/강남구</p>
        </Location>

        <Interest>
          <LightningFill size="26" title="Interest icon" />
          <p>컴퓨터/IT/웹개발</p>
        </Interest>
       
       <SelfIntro>UI/UX 디자인에 관심이 많은 주니어 프론트엔드 개발자 입니다.</SelfIntro>
        <Image src="{user && user.photoURL}" 
                style={{width: '70px', height: '70px', position:'absolute', right: '0'}}
                roundedCircle />
        <ProfileEditButton>
          <Link href="/profileedit">
            프로필 수정
          </Link>
        </ProfileEditButton>
    </ProfileFormBlock>
  );
};

export default Profile;
