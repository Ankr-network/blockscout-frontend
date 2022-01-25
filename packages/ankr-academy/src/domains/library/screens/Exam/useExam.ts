import { LibraryRoutesConfig } from '../../LibraryRouterConfig';
import { module1 } from '../../moduleMock';
import { useEffect, useState } from 'react';

export const useExam = () => {
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
  };
};
