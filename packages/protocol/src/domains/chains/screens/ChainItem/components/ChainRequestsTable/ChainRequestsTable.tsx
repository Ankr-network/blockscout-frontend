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
} from '@material-ui/core';
import classNames from 'classnames';
import ReactCountryFlag from 'react-country-flag';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from '../ChainNodesTable/useStyles';
import { ChainNodesTableProps } from './ChainRequestsTableProps';
import { getRows } from './ChainRequestsTableTableUtils';

const HEIGHT = 'HEIGHT';
const WEIGHT = 'WEIGHT';

export const ChainRequestsTable = ({ data }: ChainNodesTableProps) => {
  const classes = useStyles();

  const rows = useMemo(() => getRows(data), [data]);

  return (
    <>
      <TableContainer component={Paper} className={classes.root} elevation={0}>
        <Typography variant="h5" className={classes.header}>
          {t('chain-item.requests-table.header')}
        </Typography>
        <Box component={Table} minWidth={600}>
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {t('chain-item.requests-table.head.time')}
                </Typography>
              </TableCell>
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {t('chain-item.requests-table.head.command')}
                </Typography>
              </TableCell>
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {t('chain-item.requests-table.head.failed')}
                </Typography>
              </TableCell>
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {t('chain-item.requests-table.head.success')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} className={classes.row}>
                <TableCell padding="none" className={classes.cell}>
                  {capitalize(row.organization || '')}
                </TableCell>

                <TableCell padding="none" className={classes.cell}>
                  {HEIGHT}
                </TableCell>

                {row.country && (
                  <TableCell padding="none" className={classes.countryCell}>
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

                <TableCell padding="none" className={classes.cell}>
                  {WEIGHT}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Box>
      </TableContainer>
    </>
  );
};
