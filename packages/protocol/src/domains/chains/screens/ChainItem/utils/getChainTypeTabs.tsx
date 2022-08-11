import { ChainType as Type } from 'domains/chains/types';
import { GroupedEndpoints as Endpoints } from 'modules/endpoints/types';
import { SecondaryTab } from '../components/SecondaryTab';
import { Tab } from 'modules/common/hooks/useTabs';
import { chainTypeTabs as tabs } from '../constants/chainTypeTabs';
import { chainTypeToEndpointsKeyMap } from '../constants/chainTypeToEndpointsKeyMap';

export const getChainTypeTabs = (endpoints: Endpoints): Tab<Type>[] =>
  tabs
    .filter(({ id }) => endpoints[chainTypeToEndpointsKeyMap[id]].length > 0)
    .map<Tab<Type>>(({ id, title }, index, list) => ({
      id,
      title: (isSelected: boolean) => (
        <SecondaryTab
          isLast={index === list.length - 1}
          isSelected={isSelected}
          label={title?.toString() ?? ''}
        />
      ),
    }));
