import { Dispatch, SetStateAction, useMemo } from 'react';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { ArchiveMethodsCell } from 'domains/projects/components/ArchiveMethodsCell';
import { ArchiveMethodsCellHeader } from 'domains/projects/components/ArchiveMethodsCellHeader';
import { ChainsTableColumn } from 'domains/projects/components/ChainsTable';

import { ChainCell } from '../components/ChainCell';
import { NetworkBadges } from '../components/NetworkBadges';

interface ChainsTableColumnsHookProps {
  onOpenModal: (chain: Chain) => void;
  selectedProjectChainsIds: ChainID[];
  setSelectedProjectChainsIds: Dispatch<SetStateAction<ChainID[]>>;
}

export const useChainsTableColumns = ({
  onOpenModal,
  selectedProjectChainsIds,
  setSelectedProjectChainsIds,
}: ChainsTableColumnsHookProps) => {
  const columns = useMemo(
    (): ChainsTableColumn[] => [
      {
        field: 'chain',
        headerName: 'Chains',
        render: ({ allChains, chain }) => (
          <ChainCell
            allChains={allChains}
            chain={chain}
            selectedProjectChainsIds={selectedProjectChainsIds}
            setSelectedChainsIds={setSelectedProjectChainsIds}
          />
        ),
        align: 'left',
        width: '30%',
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
      {
        field: 'network',
        headerName: 'Networks',
        render: ({ chain }) => (
          <NetworkBadges
            chain={chain}
            setSelectedChainsIds={setSelectedProjectChainsIds}
            onOpenModal={onOpenModal}
          />
        ),
        align: 'left',
        width: 'auto',
      },
    ],
    [onOpenModal, selectedProjectChainsIds, setSelectedProjectChainsIds],
  );

  return {
    columns,
  };
};
