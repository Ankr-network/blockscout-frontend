import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Chain, ChainPath } from '@ankr.com/chains-list';

import { clearPathPrefix } from 'modules/chains/utils/clearPathPrefix';
import { EndpointGroup } from 'modules/endpoints/types';

import { ProjectChain } from '../../types';

export const getPathFromSubchain = (chain: Chain) => {
  return clearPathPrefix(chain.paths?.[0] || '');
};

export interface IChainTypeSelectorProps {
  typeName: string;
  subchains?: Chain[];
  chain: ProjectChain;
  endpoints: EndpointGroup[];
  selectedChainPaths: ChainPath[];
  setSelectedChainPaths: Dispatch<SetStateAction<ChainPath[]>>;
  hasPremiumColor?: boolean;
}

export const useChainTypeSelectorWithSubchains = ({
  selectedChainPaths,
  setSelectedChainPaths,
  subchains,
}: IChainTypeSelectorProps) => {
  const allPaths = useMemo(() => {
    if (!subchains?.length) {
      return [];
    }

    return subchains?.flatMap(getPathFromSubchain);
  }, [subchains]);

  const areAllSubchainsSelected = allPaths?.every(path =>
    selectedChainPaths.includes(path),
  );
  const areSomeSubchainsSelected = allPaths?.some(path =>
    selectedChainPaths.includes(path),
  );

  const isParentChecked = areAllSubchainsSelected;
  const isParentIndeterminate =
    areSomeSubchainsSelected && !areAllSubchainsSelected;

  const handleChangeParent = useCallback(() => {
    if (isParentChecked) {
      setSelectedChainPaths(paths =>
        paths.filter(path => !allPaths?.includes(path)),
      );
    } else {
      setSelectedChainPaths(paths => [...paths, ...allPaths]);
    }
  }, [allPaths, isParentChecked, setSelectedChainPaths]);

  const handleChangeChild = useCallback(
    (path: ChainPath) => {
      if (selectedChainPaths.includes(path)) {
        setSelectedChainPaths(paths => paths.filter(item => item !== path));
      } else {
        setSelectedChainPaths(paths => [...paths, path]);
      }
    },
    [selectedChainPaths, setSelectedChainPaths],
  );

  return {
    allPaths,
    isParentChecked,
    isParentIndeterminate,
    handleChangeParent,
    handleChangeChild,
    getPathFromSubchain,
  };
};
