import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import {
  decomposeChainIntoIds,
  DecomposedChainIds,
} from 'modules/endpoints/utils/decomposeChainIntoIds';
import { filterChainIdsByGroup } from 'modules/endpoints/utils/filterChainIdsByGroup';

export interface ChainIdParams {
  publicChain: IApiChain;
  chainType: ChainType;
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
  publicChain,
  chainType,
  group,
  withExceptions,
  keepEVMChainID,
}: ChainIdParams): ChainID => {
  const decomposed = decomposeChainIntoIds(
    publicChain,
    withExceptions,
    keepEVMChainID,
  );
  const chainIds = decomposed[chainTypesMap[chainType]];

  // In general case we may get more than one chain id for a specific group,
  // but actually there is only one of them at the moment.
  // It may change in the future.
  return filterChainIdsByGroup(chainIds, group.id, withExceptions)[0];
};
