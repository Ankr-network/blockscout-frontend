import { ChainType as Type } from 'domains/chains/types';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import {
  chainSubTypeTabs,
  getChainTypeTabs,
} from 'domains/chains/screens/ChainItem/constants/chainTypeTabs';
import { chainTypeToEndpointsKeyMap } from 'domains/chains/screens/ChainItem/constants/chainTypeToEndpointsKeyMap';
import { SecondaryTab } from 'modules/common/components/SecondaryTab';
import { LockedTab } from 'domains/chains/screens/ChainItem/components/LockedTab';

interface GetPrivateChainTypeTabsParams {
  endpoints: GroupedEndpoints;
  isBlockedTestnet: boolean;
  isBlockedMainnet?: boolean;
  onBlockedTabClick: () => void;
}

export const getPrivateChainTypeTabs = ({
  endpoints,
  isBlockedTestnet,
  isBlockedMainnet,
  onBlockedTabClick,
}: GetPrivateChainTypeTabsParams): Tab<Type>[] =>
  getChainTypeTabs()
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]]?.length > 0)
    .map<Tab<Type>>(({ id, title }, index, list) => {
      const blockedTestnet = isBlockedTestnet && id === Type.Testnet;
      const blockedMainnet = isBlockedMainnet && id === Type.Mainnet;
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

export const getPrivateChainTypeSelector = (endpoints: GroupedEndpoints) =>
  getChainTypeTabs()
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]]?.length > 0)
    .map(({ id, title }) => ({
      value: id,
      label: title as string,
    }));

export const getPrivateChainSubTypeSelector = () =>
  chainSubTypeTabs.map(({ id, title }) => ({
    value: id,
    label: title as string,
  }));
