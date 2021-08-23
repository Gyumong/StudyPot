import { ReactElement, useEffect } from "react";
import Header from "@components/Header";
import { StudyCardContainer } from "@components/FindStudy/styles";
import { GridBox } from "@components/FindStudy/styles";
import StudyCard from "@components/StudyCard";
import MainSelect from "@components/MainSelect";
import { useDispatch, useSelector } from "react-redux";
import { clearState, contentArray, LoadStudy, clearStudy, LoadOneStudy } from "@lib/slices/StudySlice";
import { RootState } from "@lib/store/configureStore";
import { useMemo } from "react";
import { loadUserByToken } from "@lib/slices/UserSlice";
import _ from "lodash";
import Modal from "@components/common/Modal";
import { AppDispatch } from "@lib/store/configureStore";
import { useRouter } from "next/router";
import { popModal } from "@lib/slices/ModalSlice";

const find = (): ReactElement => {
  const router = useRouter();
  const { study, last, LoadStudyLoading, selectedCategory } = useSelector((state: RootState) => state.study);
  const dispatch = useDispatch<AppDispatch>();
  const throttleGetLoadStudy = useMemo(() => _.throttle((param) => dispatch(LoadStudy(param)), 200), [dispatch]);

  useEffect(() => {
    dispatch(loadUserByToken(null));
    dispatch(LoadStudy({ lastId: null, categoryName: "" }));
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

  useEffect(() => {
    if (router.query.studyId) {
      dispatch(popModal(null));
      dispatch(LoadOneStudy({ studyId: parseInt(router.query.studyId as string) }));
    }
  }, [router.query.studyId]);

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

export default find;
