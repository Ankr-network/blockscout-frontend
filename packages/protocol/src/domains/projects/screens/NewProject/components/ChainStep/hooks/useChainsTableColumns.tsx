import { Dispatch, SetStateAction, useMemo } from 'react';
import { Check, Cross, Warning } from '@ankr.com/ui';
import { Tooltip } from '@mui/material';
import { t } from '@ankr.com/common';

import { Chain, ChainID } from 'domains/chains/types';

import { useChainStepTableStyles } from '../useChainStepTableStyles';
import { ChainRow } from '../ChainRow';
import { NetworkBadges } from '../NetworkBadges';

export interface TableColumn<T> {
  field: string;
  width?: number | string;
  headerName: React.ReactNode;
  render: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

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
  const { classes } = useChainStepTableStyles();

  const columns: TableColumn<Chain>[] = useMemo(
    () => [
      {
        field: 'chain',
        headerName: 'Chains',
        render: chain => (
          <ChainRow
            chain={chain}
            selectedProjectChainsIds={selectedProjectChainsIds}
            setSelectedChainsIds={setSelectedProjectChainsIds}
            className={classes.chainRow}
          />
        ),
        align: 'left',
        width: '30%',
      },
      {
        field: 'archiveMethods',
        headerName: (
          <div className={classes.archiveDataHeader}>
            {t('projects.new-project.step-2.active-data')}
            <Tooltip
              title="Shows whether a chain supports querying archive data"
              placement="top"
            >
              <Warning className={classes.tooltipIcon} />
            </Tooltip>
          </div>
        ),
        render: ({ isArchive }) => {
          if (isArchive) {
            return <Check className={classes.checkWrapper} />;
          }

          return <Cross className={classes.crossWrapper} />;
        },
        align: 'left',
        width: '150px',
        maxWidth: '150px',
      },
      {
        field: 'network',
        headerName: 'Networks',
        render: chain => (
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
    [
      selectedProjectChainsIds,
      setSelectedProjectChainsIds,
      onOpenModal,
      classes.archiveDataHeader,
      classes.chainRow,
      classes.crossWrapper,
      classes.checkWrapper,
      classes.tooltipIcon,
    ],
  );

  return {
    columns,
  };
};
