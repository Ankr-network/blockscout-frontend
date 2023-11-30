import { useMemo } from 'react';

import { ArchiveMethodsCell } from 'domains/projects/components/ArchiveMethodsCell';
import { ArchiveMethodsCellHeader } from 'domains/projects/components/ArchiveMethodsCellHeader';
import { ChainPath } from 'modules/chains/types';
import { ChainsTableColumn } from 'domains/projects/components/ChainsTable';

import { ProjectChainItemCellWrapper } from '../../ProjectChainItemColumnWrapper';

export interface UseProjectChainsTableColumnsParams {
  selectedChainPaths: ChainPath[];
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
}

export const useProjectChainsTableColumns = ({
  selectedChainPaths,
  selectAllSubChainPaths,
  unSelectAllSubChainPaths,
}: UseProjectChainsTableColumnsParams) =>
  useMemo(
    (): ChainsTableColumn[] => [
      {
        field: 'chain',
        headerName: 'Chains',
        render: ({ chain, allChains }) => (
          <ProjectChainItemCellWrapper
            chain={chain}
            allChains={allChains}
            selectedChainPaths={selectedChainPaths}
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
    [selectedChainPaths, selectAllSubChainPaths, unSelectAllSubChainPaths],
  );
