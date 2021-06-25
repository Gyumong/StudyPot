import React, { ReactElement, useEffect } from "react";
import Header from "@components/Header";
import { AuthTemplateBlock } from "@components/FindStudy/styles";
import { GridBox } from "@components/FindStudy/styles";
import StudyCard from "@components/StudyCard";
import { useDispatch, useSelector } from "react-redux";
import { clearState, LoadOneStudy, LoadStudy } from "@lib/slices/StudySlice";
import { RootState } from "@lib/slices";
import { useCallback } from "react";

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

  const exampleOnClick = useCallback((id) => {
    dispatch(
      LoadOneStudy({
        studyId: id,
      }),
    );
  }, []);
  return (
    <>
      <Header />
      <AuthTemplateBlock>
        <GridBox>
          {study.map((post) => {
            return (
              <div key={post.id} onClick={() => exampleOnClick(post.id)}>
                <StudyCard />
              </div>
            );
          })}
        </GridBox>
      </AuthTemplateBlock>
    </>
  );
};

export default find;
