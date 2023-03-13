import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType as Type } from 'domains/chains/types';
import { GroupedEndpoints as Endpoints } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';
import { chainTypeTabs } from 'domains/chains/screens/ChainItem/constants/chainTypeTabs';
import { chainTypeToEndpointsKeyMap } from 'domains/chains/screens/ChainItem/constants/chainTypeToEndpointsKeyMap';
import { LockedTab } from 'domains/chains/screens/ChainItem/components/LockedTab';

const isTestnetPremimumOnly = (chain: IApiChain) => {
  return chain.testnets && chain?.testnets?.length > 0
    ? chain.testnets[0].premiumOnly
    : false;
};

export const useIsTestnetPremimumOnly = (chain: IApiChain) => {
  return useMemo(() => isTestnetPremimumOnly(chain), [chain]);
};

const TESTNET_ID = 'testnet';

export const getPublicChainTypeTabs = (
  endpoints: Endpoints,
  isBlockedTestnet: boolean,
  onBlockedTestnetClick: () => void,
): Tab<Type>[] =>
  chainTypeTabs
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]].length > 0)
    .map<Tab<Type>>(({ id, title }, index, list) => {
      const blockedTestnet = isBlockedTestnet && id === TESTNET_ID;
      return {
        id,
        title: (isSelected: boolean) => {
          const label = blockedTestnet ? (
            <LockedTab title={title} />
          ) : (
            title?.toString() ?? ''
          );

          return (
            <SecondaryTab
              isLast={index === list.length - 1}
              isSelected={!blockedTestnet && isSelected}
              label={label}
              onClick={() => blockedTestnet && onBlockedTestnetClick()}
            />
          );
        },
        isDisabled: blockedTestnet,
      };
    });
