import React, { useCallback, useEffect, useMemo } from 'react';
import { Chain, ChainPath } from '@ankr.com/chains-list';
import { UserEndpointToken } from 'multirpc-sdk';

import { useAppSelector } from 'store/useAppSelector';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';

import { IProjectSubchains } from '../../hooks/useProjectSubchains';

interface IUseChainProjectAccordionProps {
  chain: Chain;
  handleProjectChange: (projectToken: string) => void;
  selectedProjectsSubchains: IProjectSubchains;
  setSelectedSubchains: (
    subchains: ChainPath[],
    projectToken: UserEndpointToken,
  ) => void;
  onToggleAccordion: (token: UserEndpointToken) => void;
  userEndpointToken: UserEndpointToken;
}

export const useChainProjectAccordion = ({
  chain,
  handleProjectChange,
  onToggleAccordion,
  selectedProjectsSubchains,
  setSelectedSubchains,
  userEndpointToken,
}: IUseChainProjectAccordionProps) => {
  const currentProjectSubchains = useMemo(
    () => selectedProjectsSubchains[userEndpointToken] || [],
    [selectedProjectsSubchains, userEndpointToken],
  );

  const allChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const isSelected = useMemo(
    () => allChainPaths.every(path => currentProjectSubchains.includes(path)),
    [allChainPaths, currentProjectSubchains],
  );

  const isIndeterminate = useMemo(
    () =>
      allChainPaths.some(path => currentProjectSubchains.includes(path)) &&
      !isSelected,
    [allChainPaths, currentProjectSubchains, isSelected],
  );

  // selected chain paths for current project accordion (adopted state for children components)
  const [selectedChainPaths, setSelectedChainPaths] = React.useState<
    ChainPath[]
  >(currentProjectSubchains);

  useEffect(() => {
    // used for synchronising temporary states on all levels (parent to child)
    setSelectedChainPaths(currentProjectSubchains);
  }, [currentProjectSubchains, selectedProjectsSubchains]);

  useEffect(() => {
    // used for synchronising temporary states on all levels (child to parent)
    setSelectedSubchains(selectedChainPaths, userEndpointToken);
  }, [selectedChainPaths, setSelectedSubchains, userEndpointToken]);

  const onProjectChange = useCallback(
    () => handleProjectChange(userEndpointToken),
    [handleProjectChange, userEndpointToken],
  );

  const onAccordionClick = useCallback(
    () => onToggleAccordion(userEndpointToken),
    [onToggleAccordion, userEndpointToken],
  );

  return {
    isSelected,
    isIndeterminate,
    onProjectChange,
    onAccordionClick,
    selectedChainPaths,
    setSelectedChainPaths,
  };
};
