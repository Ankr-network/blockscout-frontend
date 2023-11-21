import { useCallback } from 'react';

import { ChainPath } from 'modules/chains/types';
import { useAddBlockchainsToWhitelistMutation } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { useSelectedProject } from 'domains/projects/hooks/useSelectedProject';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export interface UseAddChainHandlerParams {
  onAddChainsSuccess: () => void;
  selectedProjectChainsPaths: ChainPath[];
}

export const useAddChainsToProjectHandler = ({
  onAddChainsSuccess,
  selectedProjectChainsPaths,
}: UseAddChainHandlerParams) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { project } = useSelectedProject();

  const userEndpointToken = project?.userEndpointToken;

  const [addBlockchains, { isLoading: isAddingChainsToProject }] =
    useAddBlockchainsToWhitelistMutation();

  const handleAddChainsToProject = useCallback(() => {
    if (userEndpointToken) {
      const blockchains = selectedProjectChainsPaths;

      addBlockchains({
        params: { blockchains, group, userEndpointToken },
      }).then(onAddChainsSuccess);
    }
  }, [
    addBlockchains,
    group,
    onAddChainsSuccess,
    selectedProjectChainsPaths,
    userEndpointToken,
  ]);

  return { handleAddChainsToProject, isAddingChainsToProject };
};
