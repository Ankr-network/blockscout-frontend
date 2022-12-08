import { ChainType as Type } from 'domains/chains/types';
import { GroupedEndpoints as Endpoints } from 'modules/endpoints/types';
import { SecondaryTab } from '../components/SecondaryTab';
import { Tab } from 'modules/common/hooks/useTabs';
import { chainTypeTabs as tabs } from '../constants/chainTypeTabs';
import { chainTypeToEndpointsKeyMap } from '../constants/chainTypeToEndpointsKeyMap';
import { LockTab } from '../../Chains/components/ChainsItem/LockTab';

export const TESTNET_ID = 'testnet';

export const getChainTypeTabs = (
  endpoints: Endpoints,
  isPremiumUser: boolean,
  onTabClick: (id: string) => void,
): Tab<Type>[] =>
  tabs
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]].length > 0)
    .map<Tab<Type>>(({ id, title }, index, list) => {
      const isShowPremiumDialog = !isPremiumUser && id === TESTNET_ID;
      return {
        id,
        title: (isSelected: boolean) => {
          const label = isShowPremiumDialog ? (
            <LockTab title={title} />
          ) : (
            title?.toString() ?? ''
          );

          return (
            <SecondaryTab
              isLast={index === list.length - 1}
              isSelected={!isShowPremiumDialog && isSelected}
              label={label}
              onClick={() => onTabClick(id)}
            />
          );
        },
        isDisabled: isShowPremiumDialog,
      };
    });
