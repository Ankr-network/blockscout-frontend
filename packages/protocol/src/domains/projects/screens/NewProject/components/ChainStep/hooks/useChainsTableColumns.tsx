import { Dispatch, SetStateAction, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { Check, Cross } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

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
        headerName: 'Chain',
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
        width: '30%',
      },
      {
        field: 'archiveMethods',
        headerName: 'Archive methods',
        render: ({ id, isArchive }) => {
          return (
            <Box className={getColumnWrapperClassName(id)}>
              {isArchive ? (
                <Check sx={theme => ({ color: theme.palette.primary.main })} />
              ) : (
                <Cross />
              )}
            </Box>
          );
        },
        align: 'center',
        width: '15%',
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
        width: '40%',
      },
      {
        field: 'websocket',
        headerName: 'Websocket',
        render: ({ id, hasWSFeature }) => {
          if (!hasWSFeature) {
            return <Cross className={getColumnWrapperClassName(id)} />;
          }

          return (
            <Box
              className={getColumnWrapperClassName(
                id,
                classes.premiumLabelWrapper,
              )}
            >
              <Typography variant="body2" className={classes.premiumLabelText}>
                {t('projects.new-project.step-1.premium')}
              </Typography>
            </Box>
          );
        },
        align: 'center',
        width: '150px',
      },
    ],
    [
      selectedProjectChainsIds,
      setSelectedProjectChainsIds,
      onOpenModal,
      getColumnWrapperClassName,
      classes.chainRow,
      classes.premiumLabelWrapper,
      classes.premiumLabelText,
    ],
  );

  return {
    columns,
  };
};
