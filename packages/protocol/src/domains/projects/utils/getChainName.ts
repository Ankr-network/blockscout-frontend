import { IBlockchainEntity } from 'multirpc-sdk';

import { ChainID } from 'modules/chains/types';
import { getChainName as getFallbackChainsName } from 'uiKit/utils/metatags';

import { getChainLabel } from './getChainLabel';
import { getCustomLabelForChainsCornerCases } from './getCustomLabelForChainsCornerCases';

export const getChainName = (chain: IBlockchainEntity) => {
  const chainId = chain.id as ChainID;

  const fallBackName = getFallbackChainsName(chainId);

  const label = getChainLabel(fallBackName, chain);

  const name = getCustomLabelForChainsCornerCases({ chainId, label });

  return name;
};
