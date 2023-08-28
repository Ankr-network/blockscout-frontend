import { Dispatch, SetStateAction, useMemo } from 'react';
import { Check, Cross } from '@ankr.com/ui';

import { Chain, ChainID } from 'domains/chains/types';

import { useChainStepTableStyles } from '../useChainStepTableStyles';
import { ChainRow } from '../ChainRow';
import { NetworkBadges } from '../NetworkBadges';
import { useColumnWrapperClassName } from './useColumnWrapperClassName';

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

  const { getColumnWrapperClassName } = useColumnWrapperClassName(
    selectedProjectChainsIds,
  );

  const columns: TableColumn<Chain>[] = useMemo(
    () => [
      {
        field: 'chain',
        headerName: 'Chains',
        render: chain => (
          <ChainRow
            chain={chain}
            selectedProjectChainsIds={selectedProjectChainsIds}
            setSelectedProjectChainsIds={setSelectedProjectChainsIds}
            handleOpenModal={onOpenModal}
            className={getColumnWrapperClassName(chain?.id, classes.chainRow)}
          />
        ),
        align: 'left',
        width: '240px',
      },
      {
        field: 'archiveMethods',
        headerName: 'Archive methods',
        render: ({ id, isArchive }) => {
          if (isArchive) {
            return (
              <Check
                className={getColumnWrapperClassName(id, classes.checkWrapper)}
              />
            );
          }

          return (
            <Cross
              className={getColumnWrapperClassName(id, classes.crossWrapper)}
            />
          );
        },
        align: 'center',
        width: '15%',
        maxWidth: '150px',
      },
      {
        field: 'websocket',
        headerName: 'WebSocket',
        render: ({ id, hasWSFeature }) => {
          if (!hasWSFeature) {
            return (
              <Cross
                className={getColumnWrapperClassName(id, classes.crossWrapper)}
              />
            );
          }

          return (
            <Check
              className={getColumnWrapperClassName(id, classes.checkWrapper)}
            />
          );
        },
        align: 'center',
        width: '15%',
        maxWidth: '120px',
      },
      {
        field: 'network',
        headerName: 'Networks',
        render: chain => (
          <NetworkBadges
            chain={chain}
            setSelectedChainsIds={setSelectedProjectChainsIds}
            className={getColumnWrapperClassName(chain?.id)}
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
      getColumnWrapperClassName,
      classes.chainRow,
      classes.crossWrapper,
      classes.checkWrapper,
    ],
  );

  return {
    columns,
  };
};
