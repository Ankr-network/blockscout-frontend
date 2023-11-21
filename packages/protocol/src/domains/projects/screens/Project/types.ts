import { Chain, ChainID } from 'modules/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';

export interface ProjectChainsContextValue {
  chains: Chain[];
  isLoading: boolean;
  paths: string[];
  projectChains: Chain[];
  projectChainsTabs: Tab<ChainID>[];
  selectedProjectChainsTab?: Tab<ChainID>;
  selectedProjectChainsTabId?: ChainID;
}
