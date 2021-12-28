import { useCallback, useState } from 'react';
import { lesson } from './lessonMock';

export const useLesson = () => {
  const [blocksLoaded, setBlocksLoaded] = useState<number>(1);
  const loadNextBlock = useCallback(() => {
    setBlocksLoaded(blocksLoaded + 1);
  }, [blocksLoaded]);
  const blocksToRender = lesson.blocks.slice(0, blocksLoaded);

  return {
    loadNextBlock,
    blocksToRender,
  };
};
