import { ChainPath } from '@ankr.com/chains-list';

import { ChainsTable } from 'domains/projects/components/ChainsTable';

import { useChains } from './hooks/useChains';
import { useProjectChainsTableColumns } from './hooks/useProjectChainsTableColumns';

export interface ProjectChainsTableProps {
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  setIsSelectedAll: (isSelectedAll: boolean) => void;
  searchContent?: string;
  selectedChainPaths: ChainPath[];
}

export const ProjectChainsTable = ({
  searchContent,
  selectAllSubChainPaths,
  selectedChainPaths,
  setIsSelectedAll,
  unSelectAllSubChainPaths,
}: ProjectChainsTableProps) => {
  const columns = useProjectChainsTableColumns({
    selectAllSubChainPaths,
    unSelectAllSubChainPaths,
    setIsSelectedAll,
    selectedChainPaths,
  });

  const chains = useChains(searchContent);

  return <ChainsTable chains={chains} columns={columns} />;
};
