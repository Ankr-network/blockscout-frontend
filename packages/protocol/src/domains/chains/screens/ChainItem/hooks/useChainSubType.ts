import { useMemo } from 'react';
import {
  Chain,
  ChainID,
  ZETACHAIN_ATHENS3_CHAINS,
  ChainSubType,
} from '@ankr.com/chains-list';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';

import { getChainSubTypeTabs } from '../utils/getChainSubTypeTabs';

export interface ChainSubTypeParams {
  availableSubtypes?: ChainSubType[];
  chain: Chain;
  netId?: string;
}

export interface ChainSubTypeResult {
  chainSubType?: ChainSubType;
  chainSubTypeTab?: Tab<ChainSubType>;
  chainSubTypeTabs: Tab<ChainSubType>[];
  selectSubType: (id: ChainSubType) => void;
}

const getInitialChainSubType = (
  { id }: Chain,
  netId?: string,
): ChainSubType | undefined => {
  if (id === ChainID.ZETACHAIN) {
    if (netId) {
      if (ZETACHAIN_ATHENS3_CHAINS.includes(netId as ChainID)) {
        return ChainSubType.Athens3;
      }
    }

    return ChainSubType.Athens3;
  }

  return undefined;
};

export const useChainSubType = ({
  availableSubtypes,
  chain,
  netId,
}: ChainSubTypeParams): ChainSubTypeResult => {
  const tabs = useMemo(
    () => getChainSubTypeTabs({ chain, availableSubtypes }),
    [availableSubtypes, chain],
  );

  const [chainSubTypeTabs, chainSubTypeTab, selectSubType] =
    useTabs<ChainSubType>({
      initialTabID: getInitialChainSubType(chain, netId),
      tabs,
    });

  return {
    chainSubType: chainSubTypeTab?.id,
    chainSubTypeTab,
    chainSubTypeTabs,
    selectSubType,
  };
};
