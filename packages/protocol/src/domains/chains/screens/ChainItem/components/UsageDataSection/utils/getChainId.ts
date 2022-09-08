import { ChainType } from 'domains/chains/types';
import {
  DecomposedChainIds,
  decomposeChainIntoIds,
} from 'modules/endpoints/utils/decomposeChainIntoIds';
import { ChainID, EndpointGroup } from 'modules/endpoints/types';
import { IApiChain } from 'domains/chains/api/queryChains';
import { filterChainIdsByGroup } from 'modules/endpoints/utils/filterChainIdsByGroup';

export interface ChainIdParams {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  withExceptions: boolean;
}

const chainTypesMap: Record<ChainType, keyof DecomposedChainIds> = {
  [ChainType.Devnet]: 'devnets',
  [ChainType.Mainnet]: 'mainnets',
  [ChainType.Testnet]: 'testnets',
};

export const getChainId = ({
  chain,
  chainType,
  group,
  withExceptions,
}: ChainIdParams): ChainID => {
  const decomposed = decomposeChainIntoIds(chain, withExceptions);
  const chainIds = decomposed[chainTypesMap[chainType]];

  // In general case we may get more than one chain id for a specific group,
  // but actually there is only one of them at the moment.
  // It may change in the future.
  return filterChainIdsByGroup(chainIds, group.id, withExceptions)[0];
};
