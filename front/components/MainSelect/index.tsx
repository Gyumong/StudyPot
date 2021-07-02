import { useState, useCallback, useEffect, useMemo } from "react";

import { BoxModel, OnOffline, OnOffList, Type, TypeInner, TypeDropDown, FindButton, ListTypeValue } from "./styles";

import { MagnifyingGlass } from "@styled-icons/entypo";
import { useDispatch, useSelector } from "react-redux";
import { backUrl } from "config/config";
import axios from "axios";
import { RootState } from "@lib/slices";
import _ from "lodash";
import { filterCategory, LoadDetailStudy, LoadStudy } from "@lib/slices/StudySlice";
interface IdefaultValue {
  [key: string]: string;
}

const MainSelect = () => {
  const [defaultValue, setDefaultValue] = useState<Array<IdefaultValue>>([]);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const { study, selectedCategory } = useSelector((state: RootState) => state.study);
  const throttleGetLoadStudy = useMemo(() => _.throttle((param) => dispatch(LoadStudy(param)), 3000), [dispatch]);

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

  const Selected = useCallback(
    (props) => {
      dispatch(filterCategory(props.key));
      setChange(true);
    },
    [change],
  );

  const onSubmit = useCallback(() => {
    const lastId = change ? null : study[study.length - 1]?.id;
    throttleGetLoadStudy({ lastId, categoryName: selectedCategory });
    setChange(false);
  }, [selectedCategory, change]);
  const [dropdown, setDropdown] = useState(false);
  const typeValue = ["온라인", "오프라인", "온/오프라인"];

  const [categoryDrop, setCategoryDrop] = useState(false);
  const SelectMeetingType = useCallback((props) => {
    dispatch(filterCategory(props.value));
  }, []);
  function ListTypeItem(props: any) {
    return <ListTypeValue onClick={() => SelectMeetingType(props)}>{props.value}</ListTypeValue>;
  }

  function PopModal() {
    return (
      <OnOffList>
        {typeValue.map((type, i) => {
          return <ListTypeItem key={i} value={type} />;
        })}
      </OnOffList>
    );
  }

  function CategoryDrop() {
    return (
      <TypeDropDown>
        <li style={{ marginTop: "1rem" }}>전체</li>
        {defaultValue.map((category) => {
          return (
            <li key={category.key} value={category.value} onClick={() => Selected(category)}>
              {category.value}
            </li>
          );
        })}
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

      <FindButton onClick={onSubmit}>
        <MagnifyingGlass size="34" title="MagnifyingGlass" />
      </FindButton>
    </BoxModel>
  );
};

export default MainSelect;
