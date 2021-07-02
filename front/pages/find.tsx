import React, { ReactElement, useEffect } from "react";
import Header from "@components/Header";
import { StudyCardContainer } from "@components/FindStudy/styles";
import { GridBox } from "@components/FindStudy/styles";
import StudyCard from "@components/StudyCard";
import MainSelect from "@components/MainSelect";
import { useDispatch, useSelector } from "react-redux";
import { clearState, LoadOneStudy, LoadStudy } from "@lib/slices/StudySlice";
import { RootState } from "@lib/slices";
import { useCallback, useMemo } from "react";
import { loadUserByToken } from "@lib/slices/UserSlice";
import _ from "lodash";
import { createSelector } from "@reduxjs/toolkit";

const find = (): ReactElement => {
  const { study, lastIdOfStudyList, last, isFetching, filterStudy } = useSelector((state: RootState) => state.study);

  const dispatch = useDispatch();
  const throttleGetLoadStudy = useMemo(() => _.throttle((param) => dispatch(LoadStudy(param)), 3000), [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (filterStudy) {
      const lastId = study[study.length - 1]?.id;
      throttleGetLoadStudy({ lastId, categoryName: filterStudy });
    } else {
      const lastId = study[study.length - 1]?.id;
      throttleGetLoadStudy({ lastId });
    }
  }, []);
  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, [filterStudy]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!last && !isFetching) {
          if (filterStudy) {
            const lastId = study[study.length - 1]?.id;
            throttleGetLoadStudy({ lastId, categoryName: filterStudy });
          } else {
            const lastId = study[study.length - 1]?.id;
            throttleGetLoadStudy({ lastId });
          }
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [study, last, isFetching]);

  const TestCategory = useCallback(() => {
    const lastId = study[study.length - 1]?.id;
    throttleGetLoadStudy({ categoryName: "COMPUTER_IT", lastId });
  }, []);

  return (
    <>
      <Header />
      <MainSelect />
      <StudyCardContainer>
        <GridBox>
          {study.map((post) => {
            return <StudyCard key={post.id} studyId={post.id} study={post} />;
          })}
        </GridBox>
      </StudyCardContainer>
    </>
  );
};

export default find;
