import { useEffect, useState } from 'react';
import { SortType } from 'domains/chains/types';

const getSortType = (isWalletConnected: boolean): SortType =>
  isWalletConnected ? SortType.Usage : SortType.Name;

export const useSortType = (
  isWalletConnected: boolean,
): [SortType, (type: SortType) => void] => {
  const [type, setType] = useState(getSortType(isWalletConnected));

  useEffect(() => {
    setType(() => getSortType(isWalletConnected));
  }, [isWalletConnected]);

  return [type, setType];
};
