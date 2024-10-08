import { ChainPath } from '@ankr.com/chains-list';
import { Dispatch, SetStateAction } from 'react';

import { ChainsTable } from 'domains/projects/components/ChainsTable';

import { useChains } from './hooks/useChains';
import { useProjectChainsTableColumns } from './hooks/useProjectChainsTableColumns';

export interface ProjectChainsTableProps {
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  setIsSelectedAll: (isSelectedAll: boolean) => void;
  searchContent?: string;
  selectedChainPaths: ChainPath[];
  setSelectedChainPaths: Dispatch<SetStateAction<ChainPath[]>>;
}

export const ProjectChainsTable = ({
  searchContent,
  selectAllSubChainPaths,
  selectedChainPaths,
  setIsSelectedAll,
  setSelectedChainPaths,
  unSelectAllSubChainPaths,
}: ProjectChainsTableProps) => {
  const columns = useProjectChainsTableColumns({
    selectAllSubChainPaths,
    unSelectAllSubChainPaths,
    setIsSelectedAll,
    selectedChainPaths,
    setSelectedChainPaths,
  });

  const chains = useChains(searchContent);

  return <ChainsTable chains={chains} columns={columns} />;
};
