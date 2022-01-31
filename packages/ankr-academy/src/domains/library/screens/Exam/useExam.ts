import { LibraryRoutesConfig } from '../../LibraryRouterConfig';
import { module1 } from '../../moduleMock';
import { useEffect, useState } from 'react';
import { useGlossaryData } from '../../../glossary/hooks';

export const useExam = () => {
  /* request glossary start */
  const { data: glossaryData, loading } = useGlossaryData();
  /* request glossary end */

  const { examId } = LibraryRoutesConfig.exam.useParams();
  const currentExam = module1[examId];
  const [blocksLoaded, setBlocksLoaded] = useState<number>(1);

  useEffect(() => {
    setBlocksLoaded(1);
  }, [examId]);

  const loadNextBlock = () => {
    setBlocksLoaded(blocksLoaded + 1);
  };
  const blocksToRender = currentExam.blocks.slice(0, blocksLoaded);

  return {
    examTitle: currentExam.title,
    loadNextBlock,
    blocksToRender,
    glossaryData,
    loading,
  };
};
