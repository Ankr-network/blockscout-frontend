import { Chain } from '@ankr.com/chains-list';

import { getGroupedEndpoints } from 'modules/endpoints/utils/getGroupedEndpoints';
import { chainGroups } from 'modules/endpoints/constants/groups';

export const hasWsFeature = (chain: Chain): boolean => {
  const { devnet, mainnet, testnet } = getGroupedEndpoints({
    chain,
    groups: chainGroups,
  });

  return [...mainnet, ...testnet, ...devnet]
    .flatMap(item => item.urls)
    .some(url => url.ws);
};
