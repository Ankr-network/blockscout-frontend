import { Chain } from '@ankr.com/chains-list';
import { MouseEvent, useCallback, useMemo } from 'react';

import { ANIMATION_DURATION } from 'domains/projects/screens/Project/components/ProjectChainsAccordion/components/AccordionItem/hooks/useAccordionItem';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { filterChainByPaths } from 'modules/chains/utils/filterChainByPaths';
import { useCodeExampleStatus } from 'domains/chains/screens/ChainPage/components/ChainProjectsSection/useCodeExampleStatus';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSelectTokenIndex } from 'domains/jwtToken/hooks/useSelectTokenIndex';

export interface IUseProjectActionsProps {
  chain: Chain;
  handleAddToProjectsDialogOpen: () => void;
  jwt: JWT;
  projectWhitelistBlockchains: string[];
}

export const useProjectActions = ({
  chain,
  handleAddToProjectsDialogOpen,
  jwt,
  projectWhitelistBlockchains,
}: IUseProjectActionsProps) => {
  const { index: currentProjectIndex, userEndpointToken } = jwt;

  const projectChain = useMemo(() => {
    // empty array means all chains are included, no need to filter.
    if (projectWhitelistBlockchains.length === 0) {
      return chain;
    }

    return filterChainByPaths({ chain, paths: projectWhitelistBlockchains });
  }, [chain, projectWhitelistBlockchains]);

  const {
    isOpened: isCodeExampleDialogOpened,
    onClose: handleCodeExampleDialogClose,
    onOpen: handleCodeExampleOpen,
  } = useDialog();

  const { handleSelectTokenIndex } = useSelectTokenIndex();

  const onOpenCodeExample = useCallback(() => {
    handleSelectTokenIndex(currentProjectIndex);
    setTimeout(handleCodeExampleOpen, ANIMATION_DURATION);
  }, [currentProjectIndex, handleSelectTokenIndex, handleCodeExampleOpen]);

  const { isCodeExampleDisabled: isCodeExampleDialogDisabled } =
    useCodeExampleStatus(chain, onOpenCodeExample);

  const handleCodeExampleDialogOpen = useCallback(
    (event?: MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      onOpenCodeExample();
    },
    [onOpenCodeExample],
  );

  const onAddToProjectButtonClick = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation();
      handleAddToProjectsDialogOpen();
    },
    [handleAddToProjectsDialogOpen],
  );

  return {
    handleCodeExampleDialogClose,
    handleCodeExampleDialogOpen,
    isCodeExampleDialogDisabled,
    isCodeExampleDialogOpened,
    onAddToProjectButtonClick,
    projectChain,
    userEndpointToken,
  };
};
