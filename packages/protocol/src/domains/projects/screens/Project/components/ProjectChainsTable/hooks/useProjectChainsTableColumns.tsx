import { useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { ArchiveMethodsCell } from 'domains/projects/components/ArchiveMethodsCell';
import { ArchiveMethodsCellHeader } from 'domains/projects/components/ArchiveMethodsCellHeader';
import { ChainsTableColumn } from 'domains/projects/components/ChainsTable';

import { ProjectChainItemCellWrapper } from '../../ProjectChainItemColumnWrapper';

export interface UseProjectChainsTableColumnsParams {
  selectedChainPaths: ChainPath[];
  setIsSelectedAll: (isSelectedAll: boolean) => void;
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
}

export const useProjectChainsTableColumns = ({
  selectAllSubChainPaths,
  selectedChainPaths,
  setIsSelectedAll,
  unSelectAllSubChainPaths,
}: UseProjectChainsTableColumnsParams) =>
  useMemo(
    (): ChainsTableColumn[] => [
      {
        field: 'chain',
        headerName: 'Chains',
        render: ({ allChains, chain }) => (
          <ProjectChainItemCellWrapper
            chain={chain}
            allChains={allChains}
            selectedChainPaths={selectedChainPaths}
            setIsSelectedAll={setIsSelectedAll}
            selectAllSubChainPaths={selectAllSubChainPaths}
            unSelectAllSubChainPaths={unSelectAllSubChainPaths}
          />
        ),
        align: 'left',
        width: 'auto',
      },
      {
        field: 'archiveMethods',
        headerName: <ArchiveMethodsCellHeader />,
        render: ({ chain: { isArchive } }) => (
          <ArchiveMethodsCell isArchive={isArchive} />
        ),
        align: 'left',
        width: '150px',
        maxWidth: '150px',
      },
    ],
    [
      selectedChainPaths,
      setIsSelectedAll,
      selectAllSubChainPaths,
      unSelectAllSubChainPaths,
    ],
  );
