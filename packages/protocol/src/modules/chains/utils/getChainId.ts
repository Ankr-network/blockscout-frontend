import { ChainID, Chain, ChainType, ChainSubType } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import {
  decomposeChainIntoIds,
  DecomposedChainIds,
} from 'modules/endpoints/utils/decomposeChainIntoIds';
import { filterChainIdsByGroup } from 'modules/endpoints/utils/filterChainIdsByGroup';
import { filterChainsBySubType } from 'modules/endpoints/utils/filterChainsBySubType';

export interface ChainIdParams {
  publicChain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  withExceptions?: boolean;
  keepEVMChainID?: boolean;
}

const chainTypesMap: Record<ChainType, keyof DecomposedChainIds> = {
  [ChainType.Devnet]: 'devnets',
  [ChainType.Mainnet]: 'mainnets',
  [ChainType.Testnet]: 'testnets',
};

export const getChainId = ({
  chainSubType,
  chainType,
  group,
  keepEVMChainID,
  publicChain,
  withExceptions,
}: ChainIdParams): ChainID => {
  const decomposed = decomposeChainIntoIds(
    publicChain,
    withExceptions,
    keepEVMChainID,
  );

  const chainIds = decomposed[chainTypesMap[chainType]];

  const filteredChainIds = filterChainsBySubType(chainIds, chainSubType);

  // In general case we may get more than one chain id for a specific group,
  // but actually there is only one of them at the moment.
  // It may change in the future.
  return filterChainIdsByGroup(filteredChainIds, group.id, withExceptions)[0];
};
