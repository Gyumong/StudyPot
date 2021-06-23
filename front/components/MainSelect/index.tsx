import {useState} from "react";

import {
  BoxModel,
  OnOffline,
  OnOffList,
  Type,
  TypeInner,
  TypeDropDown,
  FindButton
} from "./styles";

import { MagnifyingGlass } from "@styled-icons/entypo";

const MainSelect = () => {
  
  let [dropdown, setDropdown] = useState(false);

  let [categoryDrop, setCategoryDrop] = useState(false);

  function PopModal() {
    return(
      <OnOffList>
          <li style={{marginTop:"1rem"}}>온라인</li>
          <li>오프라인</li>
          <li>온/오프라인</li>
      </OnOffList>
    )
  }

  function CategoryDrop() {
    return(
      <TypeDropDown>
        <li style={{marginTop:"1rem"}}>전체</li>
        <li>자격증</li>
        <li>어학</li>
        <li>입시</li>
    </TypeDropDown>
    )
  } 

  return (
  
   <BoxModel>

     <OnOffline onClick={() => {setDropdown(!dropdown)}}>
      
          <p>타입</p>
          <span>온∙오프라인</span>
         
     </OnOffline>
     { dropdown === true ? <PopModal/> : null }
    

     <Type onClick={() => {setCategoryDrop(!categoryDrop)}}>
        <TypeInner>
          <p>카테고리</p> 
          <span>스터디 종류를 선택하세요</span>
        </TypeInner>
        { categoryDrop === true ? <CategoryDrop/> : null}
     </Type>
    

     <FindButton>
       <MagnifyingGlass size="34" title="MagnifyingGlass"/>
    </FindButton>


   </BoxModel>
  
  );
};

export default MainSelect;


