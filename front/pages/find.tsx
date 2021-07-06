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

const find = (): ReactElement => {
  const { study, last, isFetching, selectedCategory } = useSelector((state: RootState) => state.study);

  const dispatch = useDispatch();
  const throttleGetLoadStudy = useMemo(() => _.throttle((param) => dispatch(LoadStudy(param)), 200), [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);

    const lastId = study[study.length - 1]?.id;
    throttleGetLoadStudy({ lastId, categoryName: selectedCategory });
  }, []);
  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!last && !isFetching) {
          const lastId = study[study.length - 1]?.id;
          throttleGetLoadStudy({ lastId, categoryName: selectedCategory });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [study, last, isFetching, selectedCategory]);

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
