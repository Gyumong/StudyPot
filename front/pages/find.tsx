import React, { ReactElement, useEffect } from "react";
import Header from "@components/Header";
import { AuthTemplateBlock } from "@components/FindStudy/styles";
import { GridBox } from "@components/FindStudy/styles";
import StudyCard from "@components/StudyCard";
import { useDispatch, useSelector } from "react-redux";
import { clearState, LoadStudy } from "@lib/slices/StudySlice";
import { RootState } from "@lib/slices";

const find = (): ReactElement => {
  const { study, lastIdOfStudyList, last, isFetching } = useSelector((state: RootState) => state.study);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadStudy());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 150) {
        if (!last && !isFetching) {
          const lastId = study[study.length - 1]?.id;
          dispatch(LoadStudy({ lastId }));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [study, last, isFetching]);
  return (
    <>
      <Header />
      <AuthTemplateBlock>
        <GridBox>
          <StudyCard />
          <StudyCard />
          <StudyCard />
          <StudyCard />
          <StudyCard />
          <StudyCard />
          <StudyCard />
        </GridBox>
      </AuthTemplateBlock>
    </>
  );
};

export default find;
