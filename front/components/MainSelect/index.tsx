import { useState, useCallback } from "react";

import { BoxModel, OnOffline, OnOffList, Type, TypeInner, TypeDropDown, FindButton } from "./styles";

import { MagnifyingGlass } from "@styled-icons/entypo";
import { useDispatch } from "react-redux";
import { filterMeetingType, resetStudy } from "@lib/slices/StudySlice";

const MainSelect = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);

  const [categoryDrop, setCategoryDrop] = useState(false);

  const onClickSelectbar = useCallback((e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === "온라인") {
      dispatch(filterMeetingType({ data: "온라인" }));
    } else {
      dispatch(resetStudy());
    }
  }, []);

  function PopModal() {
    return (
      <OnOffList onClick={onClickSelectbar}>
        <li style={{ marginTop: "1rem" }} value={"온라인"}>
          온라인
        </li>
        <li>오프라인</li>
        <li>온/오프라인</li>
      </OnOffList>
    );
  }

  function CategoryDrop() {
    return (
      <TypeDropDown>
        <li style={{ marginTop: "1rem" }}>전체</li>
        <li>자격증</li>
        <li>어학</li>
        <li>입시</li>
      </TypeDropDown>
    );
  }

  return (
    <BoxModel>
      <OnOffline
        onClick={() => {
          setDropdown(!dropdown);
        }}
      >
        <p>타입</p>
        <span>온∙오프라인</span>
      </OnOffline>
      {dropdown === true ? <PopModal /> : null}

      <Type
        onClick={() => {
          setCategoryDrop(!categoryDrop);
        }}
      >
        <TypeInner>
          <p>카테고리</p>
          <span>스터디 종류를 선택하세요</span>
        </TypeInner>
        {categoryDrop === true ? <CategoryDrop /> : null}
      </Type>

      <FindButton>
        <MagnifyingGlass size="34" title="MagnifyingGlass" />
      </FindButton>
    </BoxModel>
  );
};

export default MainSelect;
