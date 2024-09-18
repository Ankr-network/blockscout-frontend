import { Chain, ChainID } from '@ankr.com/chains-list';

import { Tab } from 'modules/common/hooks/useTabs';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';

import { ProjectChainTab } from '../components/ProjectChainTab';

export const getProjectChainsTabs = (chains: Chain[], isLightTheme = false) =>
  chains.map<Tab<ChainID>>(chain => {
    return {
      ...chain,
      title: (isSelected: boolean) => (
        <ProjectChainTab
          iconUrl={getChainIcon(chain.id, isLightTheme)}
          name={chain.name}
          isSelected={isSelected}
        />
      ),
    };
  });
