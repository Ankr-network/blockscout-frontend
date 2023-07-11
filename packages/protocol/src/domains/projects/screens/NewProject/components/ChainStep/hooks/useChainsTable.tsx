import { useMemo } from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import { Check, Cross } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { Chain } from 'domains/chains/types';

import { useSelectedChain } from './useSelectedChain';
import { useChainStepTableStyles } from '../useChainStepTableStyles';
import { ChainSelect } from '../ChainSelect';
import { ChainItem } from '../../ChainItem';

export interface TableColumn<T> {
  field: string;
  width?: number | string;
  headerName: React.ReactNode;
  render: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export const useChainsTable = () => {
  const { classes } = useChainStepTableStyles();

  const { selectedChainId, setSelectedChainId, getColumnWrapperClassName } =
    useSelectedChain();

  const columns: TableColumn<Chain>[] = useMemo(
    () => [
      {
        field: 'chain',
        headerName: 'Chain',
        render: chain => {
          const { id } = chain;
          const isCurrentChainActive = selectedChainId === id;
          const handleCheck = () =>
            setSelectedChainId(isCurrentChainActive ? undefined : id);

          return (
            <Box
              display="flex"
              alignItems="center"
              className={getColumnWrapperClassName(id)}
            >
              <Checkbox
                checked={isCurrentChainActive}
                onClick={handleCheck}
                sx={{ mr: 2 }}
              />
              <ChainItem chain={chain} />
            </Box>
          );
        },
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
        headerName: 'Network',
        render: chain => {
          const isSelected = chain.id === selectedChainId;

          if (!isSelected) {
            return null;
          }

          return (
            <ChainSelect
              className={getColumnWrapperClassName(chain.id)}
              chain={chain}
            />
          );
        },
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
      selectedChainId,
      setSelectedChainId,
      classes.premiumLabelText,
      classes.premiumLabelWrapper,
      getColumnWrapperClassName,
    ],
  );

  return {
    columns,
  };
};
