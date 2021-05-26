import React, { ReactElement } from "react";
import {
  ProfileFormBlock,
  Location,
  Interest,
  UserName,
  SelfIntro,
  ProfileEditButton,
  DescBlock,
  ImageBlock,
} from "./styles";
import Link from "next/link";
import Image from "react-bootstrap/Image";

import { LocationPin } from "@styled-icons/entypo/LocationPin";
import { LightningFill } from "@styled-icons/bootstrap/LightningFill";
import gravatar from "gravatar";
import useMyInfo from "@hooks/useMyInfo";
import { useRouter } from "next/router";
const Profile = (): ReactElement => {
  const [userData, error] = useMyInfo();
  const router = useRouter();
  // if (!userData ) {
  //   router.push("/");
  // }
  if (!userData && !error) {
    <div>loading...</div>;
  }
  return (
    <ProfileFormBlock>
      <DescBlock>
        <UserName>{userData?.name}</UserName>
        <Location>
          <LocationPin size="28" title="Location icon" />
          <p>서울시/강남구</p>
        </Location>
        <Interest>
          <LightningFill size="26" title="Interest icon" />
          <p>컴퓨터/IT/웹개발</p>
        </Interest>
        <SelfIntro>UI/UX 디자인에 관심이 많은 주니어 프론트엔드 개발자 입니다.</SelfIntro>
        <ProfileEditButton>
          <Link href="/profileedit">프로필 수정</Link>
        </ProfileEditButton>
      </DescBlock>
      <ImageBlock>
        <img src={gravatar.url(userData?.name, { s: "24px", d: "retro" })} style={{ width: "70px", height: "70px" }} />
      </ImageBlock>
    </ProfileFormBlock>
  );
};

export default Profile;
