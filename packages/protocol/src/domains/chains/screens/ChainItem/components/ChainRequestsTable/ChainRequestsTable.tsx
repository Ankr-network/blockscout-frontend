import React, { useMemo } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  capitalize,
  Box,
} from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

import { t } from '@ankr.com/common';
import { useStyles } from '../ChainNodesTable/useStyles';
import { ChainNodesTableProps } from './ChainRequestsTableProps';
import { getRows } from './ChainRequestsTableTableUtils';

const HEIGHT = 'HEIGHT';
const WEIGHT = 'WEIGHT';

export const ChainRequestsTable = ({ data }: ChainNodesTableProps) => {
  const { classes } = useStyles();

  const rows = useMemo(() => getRows(data), [data]);

  return (
    <>
      <TableContainer component={Paper} className={classes.root} elevation={0}>
        <Typography variant="h5" className={classes.header}>
          {t('chain-item.requests-table.header')}
        </Typography>
        <Box component={Table} minWidth={600}>
          <TableHead>
            <TableRow>
              <TableCell padding="none">
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle2}
                >
                  {t('chain-item.requests-table.head.time')}
                </Typography>
              </TableCell>
              <TableCell padding="none">
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle2}
                >
                  {t('chain-item.requests-table.head.command')}
                </Typography>
              </TableCell>
              <TableCell padding="none">
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle2}
                >
                  {t('chain-item.requests-table.head.failed')}
                </Typography>
              </TableCell>
              <TableCell padding="none">
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className={classes.subtitle2}
                >
                  {t('chain-item.requests-table.head.success')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell padding="none">
                  {capitalize(row.organization || '')}
                </TableCell>

                <TableCell padding="none">{HEIGHT}</TableCell>

                {row.country && (
                  <TableCell padding="none">
                    <ReactCountryFlag
                      svg
                      className={classes.flag}
                      countryCode={row.country}
                    />
                    &nbsp; &nbsp;
                    {row.city}
                    &nbsp; ({t(`continents.${row.continent}`)})
                  </TableCell>
                )}

                <TableCell padding="none">{WEIGHT}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Box>
      </TableContainer>
    </>
  );
};
