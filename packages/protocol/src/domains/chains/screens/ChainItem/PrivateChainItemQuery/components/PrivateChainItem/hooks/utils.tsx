import { ChainType as Type } from 'domains/chains/types';
import {
  GroupedEndpoints as Endpoints,
  GroupedEndpoints,
} from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { chainTypeTabs } from 'domains/chains/screens/ChainItem/constants/chainTypeTabs';
import { chainTypeToEndpointsKeyMap } from 'domains/chains/screens/ChainItem/constants/chainTypeToEndpointsKeyMap';
import { SecondaryTab } from 'domains/chains/screens/ChainItem/components/SecondaryTab';

export const getPrivateChainTypeTabs = (endpoints: Endpoints): Tab<Type>[] =>
  chainTypeTabs
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]].length > 0)
    .map<Tab<Type>>(({ id, title }, index, list) => {
      return {
        id,
        title: (isSelected: boolean) => {
          return (
            <SecondaryTab
              isLast={index === list.length - 1}
              isSelected={isSelected}
              label={title?.toString() ?? ''}
            />
          );
        },
      };
    });

export const getPrivateChainTypeSelector = (endpoints: GroupedEndpoints) =>
  chainTypeTabs
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]].length > 0)
    .map(({ id, title }) => ({
      value: id,
      label: title as string,
    }));
