import { getGroupedEndpoints } from 'modules/endpoints/utils/getGroupedEndpoints';
import { chainGroups } from 'modules/endpoints/constants/groups';
import { Chain } from 'modules/chains/types';

export const hasWsFeature = (chain: Chain): boolean => {
  const { mainnet, testnet, devnet } = getGroupedEndpoints({
    chain,
    groups: chainGroups,
  });

  return [...mainnet, ...testnet, ...devnet]
    .flatMap(item => item.urls)
    .some(url => url.ws);
};
