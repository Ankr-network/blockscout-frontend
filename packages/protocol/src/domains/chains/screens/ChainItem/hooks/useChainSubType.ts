import { useMemo } from 'react';

import {
  Chain,
  ChainID,
  ChainsAthens2,
  ChainsAthens3,
  ChainSubType,
} from 'domains/chains/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';

import { getChainSubTypeTabs } from '../utils/getChainSubTypeTabs';

export interface ChainSubTypeParams {
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
      if (ChainsAthens2.includes(netId as ChainID)) {
        return ChainSubType.Athens2;
      }

      if (ChainsAthens3.includes(netId as ChainID)) {
        return ChainSubType.Athens3;
      }
    }

    return ChainSubType.Athens2;
  }

  return undefined;
};

export const useChainSubType = ({
  chain,
  netId,
}: ChainSubTypeParams): ChainSubTypeResult => {
  const tabs = useMemo(
    () =>
      getChainSubTypeTabs({
        chain,
      }),
    [chain],
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
