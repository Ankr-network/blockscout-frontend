import { createContext } from 'react';

import { ProjectChainsContextValue } from './types';

export const ProjectChainsContext = createContext<ProjectChainsContextValue>({
  chains: [],
  isLoading: false,
  paths: [],
  projectChains: [],
  projectChainsTabs: [],
  selectedProjectChainsTab: undefined,
  selectedProjectChainsTabId: undefined,
});
