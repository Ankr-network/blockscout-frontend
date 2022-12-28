import { useEffect, useState } from 'react';
import { SortType } from 'domains/chains/types';

const getSortType = (isLoggedIn?: boolean): SortType =>
  isLoggedIn ? SortType.Usage : SortType.Name;

export const useSortType = (
  isLoggedIn?: boolean,
): [SortType, (type: SortType) => void] => {
  const [type, setType] = useState(getSortType(isLoggedIn));

  useEffect(() => {
    setType(() => getSortType(isLoggedIn));
  }, [isLoggedIn]);

  return [type, setType];
};
