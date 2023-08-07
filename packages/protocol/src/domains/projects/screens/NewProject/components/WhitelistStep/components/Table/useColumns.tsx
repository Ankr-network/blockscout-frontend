import { Box, Typography } from '@mui/material';
import { ReactNode, useMemo } from 'react';

import { AddToWhitelistFormData } from 'domains/projects/store';
import { BlockchainIcon } from 'domains/projects/screens/Projects/components/BlockchainIcon';

import { useTableStyles } from './useTableStyles';
import { whitelistTypeLabelMap } from '../AddToWhitelistDialog/components/AddToWhitelistForm/AddToWhitelistFormUtils';

export interface TableColumn<T> {
  field: string;
  width?: number | string;
  headerName: ReactNode;
  render: (row: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

export const useColumns = () => {
  const { classes } = useTableStyles();

  const columns: TableColumn<AddToWhitelistFormData>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        render: ({ value }) => {
          return (
            <Typography variant="body2" fontSize={14} lineHeight="140%">
              {value}
            </Typography>
          );
        },
        align: 'left',
        width: '50%',
      },
      {
        field: 'type',
        headerName: 'Type',
        render: ({ type }) => {
          return (
            <Box className={classes.typeCell}>
              <Typography variant="body2" fontSize={14} lineHeight="140%">
                {whitelistTypeLabelMap(type)}
              </Typography>
            </Box>
          );
        },
        align: 'left',
        width: '25%',
      },
      {
        field: 'chains',
        headerName: 'Chain allowance',
        render: ({ chains }) => <BlockchainIcon blockchains={chains} />,
        align: 'left',
        width: '25%',
      },
    ],
    [classes.typeCell],
  );

  return {
    columns,
  };
};
