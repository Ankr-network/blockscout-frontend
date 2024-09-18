import { useEffect, useMemo, useRef } from 'react';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

export interface UseNewTabSelectionParams {
  handleSelectProjectChainsTab: (id: ChainID) => void;
  projectChains: Chain[];
}

export const useNewTabSelection = ({
  handleSelectProjectChainsTab,
  projectChains,
}: UseNewTabSelectionParams) => {
  const projectChainsRef = useRef(projectChains);
  const { setChainId } = ProjectsRoutesConfig.project.useParams();

  // getting difference between previous projectChains and current states
  const newProjectChains = useMemo(() => {
    const oldProjectChainsList = projectChainsRef.current;

    const newChains = projectChains.filter(chain => {
      const isChainInOldChainsList = oldProjectChainsList.some(
        oldChain => oldChain.id === chain.id,
      );

      return !isChainInOldChainsList;
    });

    projectChainsRef.current = projectChains;

    return newChains;
  }, [projectChains]);

  useEffect(
    () => {
      if (newProjectChains.length > 0) {
        const selectedChainId = newProjectChains[0].id;

        handleSelectProjectChainsTab(selectedChainId);
        setChainId(selectedChainId);
      }
    },
    // we should select a new tab if we've got new chains only
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newProjectChains],
  );
};
