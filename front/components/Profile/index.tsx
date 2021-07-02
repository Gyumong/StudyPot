import React, { ReactElement, useEffect } from "react";
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

import { LocationPin } from "@styled-icons/entypo/LocationPin";
import { LightningFill } from "@styled-icons/bootstrap/LightningFill";
import gravatar from "gravatar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadUserByToken } from "@lib/slices/UserSlice";
import { RootState } from "@lib/slices";

const Profile = (): ReactElement => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, [dispatch]);
  console.log(user);
  console.log(user.image);

  return (
    <ProfileFormBlock>
      
      <DescBlock>
        <UserName>{user.name}</UserName>

        <Location>
          <LocationPin size="28" title="Location icon" />
          <p>{user.location}</p>
        </Location>
        <Interest>
          <LightningFill size="26" title="Interest icon" />
          {user.categories.map((value: any) => {
            return <p>{value.value}</p>;
          })}
        </Interest>

        <SelfIntro>{user.introduction}</SelfIntro>

        <ProfileEditButton>
          <Link href="/profileedit">
            <a>프로필 수정</a>
          </Link>
        </ProfileEditButton>
      </DescBlock>

      <ImageBlock>
        {user.image ? (
          <img src={`${user.image}`} style={{ width: "100px", height: "100px" }} />
        ) : (
          <img src={gravatar.url(user.name, { s: "24px", d: "retro" })} style={{ width: "70px", height: "70px" }} />
        )}
      </ImageBlock>

    </ProfileFormBlock>
  );
};

export default Profile;
