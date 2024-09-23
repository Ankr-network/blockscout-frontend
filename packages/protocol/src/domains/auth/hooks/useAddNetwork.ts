import { useCallback } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import {
  IChainParams,
  useLazyAuthAddNetworkQuery,
} from '../actions/addNetwork';

export const useAddNetwork = () => {
  const [addNetwork] = useLazyAuthAddNetworkQuery();

  const handleAddNetwork = useCallback(
    (chainParams: IChainParams, chainID: ChainID) => {
      addNetwork({ chainParams, chainID });
    },
    [addNetwork],
  );

  return { handleAddNetwork };
};
