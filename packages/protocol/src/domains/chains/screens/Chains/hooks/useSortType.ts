import { useState } from 'react';
import { SortType } from 'domains/chains/types';

export const useSortType = (): [SortType, (type: SortType) => void] => {
  const [type, setType] = useState(SortType.Usage);

  return [type, setType];
};
