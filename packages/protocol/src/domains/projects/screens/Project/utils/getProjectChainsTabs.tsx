import { Chain, ChainID } from 'modules/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';

import { ProjectChainTab } from '../components/ProjectChainTab';

export const getProjectChainsTabs = (chains: Chain[], isLightTheme = false) =>
  chains.map<Tab<ChainID>>(({ id, name }) => ({
    id,
    title: (isSelected: boolean) => (
      <ProjectChainTab
        iconUrl={getChainIcon(id, isLightTheme)}
        name={name}
        isSelected={isSelected}
      />
    ),
  }));
