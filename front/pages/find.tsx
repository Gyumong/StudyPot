import React, { ReactElement, useEffect } from "react";
import Header from "@components/Header";
import { StudyCardContainer } from "@components/FindStudy/styles";
import { GridBox } from "@components/FindStudy/styles";
import StudyCard from "@components/StudyCard";
import MainSelect from "@components/MainSelect";
import { useDispatch, useSelector } from "react-redux";
import { clearState, contentArray, LoadStudy, clearStudy } from "@lib/slices/StudySlice";
import { RootState, AppThunkDispatch } from "@lib/store/configureStore";
import { useCallback, useMemo } from "react";
import { loadUserByToken } from "@lib/slices/UserSlice";
import _ from "lodash";
import Modal from "@components/common/Modal";
import wrapper, { AppDispatch, AppThunk } from "@lib/store/configureStore";
import { useAppDispatch } from "../lib/slices";

const find = (): ReactElement => {
  const { study, last, LoadStudyLoading, selectedCategory } = useSelector((state: RootState) => state.study);
  const Appdispatch = useAppDispatch();
  const dispatch = useDispatch<AppDispatch>();
  const throttleGetLoadStudy = useMemo(() => _.throttle((param) => dispatch(LoadStudy(param)), 500), [dispatch]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   const lastId = study[study.length - 1]?.id;
  //   throttleGetLoadStudy({ lastId, categoryName: selectedCategory });
  // }, []);
  useEffect(() => {
    dispatch(loadUserByToken(null));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
      dispatch(clearStudy());
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!last && !LoadStudyLoading) {
          const lastId = study[study.length - 1]?.id;
          throttleGetLoadStudy({ lastId, categoryName: selectedCategory });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [study, last, LoadStudyLoading, selectedCategory]);

  return (
    <>
      <Header />
      <MainSelect />
      <StudyCardContainer>
        <GridBox>
          {study.map((post: contentArray) => {
            return <StudyCard key={post.id} studyId={post.id} study={post} />;
          })}
        </GridBox>
        <Modal />
      </StudyCardContainer>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const dispatch = context.store.dispatch as AppThunkDispatch;
  await dispatch(LoadStudy({ lastId: null, categoryName: "" }));
});

export default find;
