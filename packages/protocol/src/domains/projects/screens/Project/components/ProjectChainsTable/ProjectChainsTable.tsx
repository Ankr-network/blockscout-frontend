import { ChainPath } from 'modules/chains/types';
import { ChainsTable } from 'domains/projects/components/ChainsTable';

import { useChains } from './hooks/useChains';
import { useProjectChainsTableColumns } from './hooks/useProjectChainsTableColumns';

export interface ProjectChainsTableProps {
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  searchContent?: string;
  selectedChainPaths: ChainPath[];
}

export const ProjectChainsTable = ({
  selectAllSubChainPaths,
  unSelectAllSubChainPaths,
  searchContent,
  selectedChainPaths,
}: ProjectChainsTableProps) => {
  const columns = useProjectChainsTableColumns({
    selectAllSubChainPaths,
    unSelectAllSubChainPaths,
    selectedChainPaths,
  });

  const chains = useChains(searchContent);

  return <ChainsTable chains={chains} columns={columns} />;
};
