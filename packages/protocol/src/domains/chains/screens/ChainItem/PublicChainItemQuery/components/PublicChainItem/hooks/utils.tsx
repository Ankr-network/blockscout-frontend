import { useMemo } from 'react';

import { ChainType, Chain } from 'domains/chains/types';
import { GroupedEndpoints as Endpoints } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { chainTypeTabs } from 'domains/chains/screens/ChainItem/constants/chainTypeTabs';
import { chainTypeToEndpointsKeyMap } from 'domains/chains/screens/ChainItem/constants/chainTypeToEndpointsKeyMap';
import { LockedTab } from 'domains/chains/screens/ChainItem/components/LockedTab';

const isTestnetPremimumOnly = (chain: Chain) => {
  return chain.testnets && chain?.testnets?.length > 0
    ? chain.testnets[0].premiumOnly
    : false;
};

export const useIsTestnetPremimumOnly = (chain: Chain) => {
  return useMemo(() => isTestnetPremimumOnly(chain), [chain]);
};

const TESTNET_ID = 'testnet';
const MAINNET_ID = 'mainnet';

interface GetPublicChainTypeTabsParams {
  endpoints: Endpoints;
  isBlockedTestnet: boolean;
  isBlockedMainnet?: boolean;
  onBlockedTabClick: () => void;
}

export const getPublicChainTypeTabs = ({
  endpoints,
  isBlockedTestnet,
  isBlockedMainnet,
  onBlockedTabClick,
}: GetPublicChainTypeTabsParams): Tab<ChainType>[] => {
  return chainTypeTabs
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]].length > 0)
    .map<Tab<ChainType>>(({ id, title }, index, list) => {
      const blockedTestnet = isBlockedTestnet && id === TESTNET_ID;
      const blockedMainnet = isBlockedMainnet && id === MAINNET_ID;
      const isBlocked = blockedTestnet || blockedMainnet;

      return {
        id,
        title: (isSelected: boolean) => {
          const label = isBlocked ? (
            <LockedTab title={title} />
          ) : (
            title?.toString() ?? ''
          );

          return (
            <SecondaryTab
              isLast={index === list.length - 1}
              isSelected={!isBlocked && isSelected}
              label={label}
              onClick={() => isBlocked && onBlockedTabClick()}
            />
          );
        },
        isDisabled: isBlocked,
      };
    });
};
