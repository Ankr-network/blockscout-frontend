import { useEffect, useState } from 'react';
import { LibraryRoutesConfig } from 'domains/library/LibraryRouterConfig';
import { module1 } from '../../moduleMock';
import { useGlossaryData } from '../../../glossary/hooks';

export const useLesson = () => {
  /* request glossary start */
  const { data: glossaryData, loading } = useGlossaryData();
  /* request glossary end */

  const { lessonId } = LibraryRoutesConfig.lesson.useParams();
  const currentLesson = module1[lessonId];
  const [blocksLoaded, setBlocksLoaded] = useState<number>(1);

  useEffect(() => {
    setBlocksLoaded(1);
  }, [lessonId]);

  useEffect(() => {
    /* scrolls to bottom of page when new blocks are loaded */
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 60);
  }, [blocksLoaded]);

  const loadNextBlock = () => {
    setBlocksLoaded(blocksLoaded + 1);
  };
  const blocksToRender = currentLesson.blocks.slice(0, blocksLoaded);
  const isLessonFinished = currentLesson.blocks.length <= blocksToRender.length;
  const nextLesson =
    currentLesson.nextLessonId && module1[currentLesson.nextLessonId]; // TODO: lessons managing

  return {
    lessonTitle: currentLesson.title,
    loadNextBlock,
    blocksToRender,
    isLessonFinished,
    nextLesson,
    glossaryData,
    loading,
  };
};
