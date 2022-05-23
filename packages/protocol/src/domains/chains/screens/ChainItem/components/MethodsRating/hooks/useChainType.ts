import { useCallback, useState } from 'react';

import { ChainType } from 'domains/chains/types';

export const useChainType = (): [ChainType, (type: ChainType) => void] => {
  const [type, setType] = useState(ChainType.Mainnet);

  const setChainType = useCallback((type_: ChainType) => {
    setType(type_);
  }, []);

  return [type, setChainType];
};
