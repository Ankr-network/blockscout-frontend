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
import { useStyles } from './useStyles';
import { ChainNodesTableProps } from './ChainNodesTableProps';
import { getRows } from './ChainNodesTableUtils';

export const ChainNodesTable = ({
  data,
  nodesWeight,
}: ChainNodesTableProps) => {
  const classes = useStyles();

  const rows = useMemo(() => getRows(data, nodesWeight), [data, nodesWeight]);

  return (
    <>
      <TableContainer component={Paper} className={classes.root} elevation={0}>
        <Typography variant="h5" className={classes.header}>
          {t('chain-item.nodes-table.header')}
        </Typography>
        <Box component={Table} minWidth={600}>
          <TableHead className={classes.thead}>
            <TableRow>
              {[
                t('chain-item.nodes-table.head.node'),
                t('chain-item.nodes-table.head.height'),
                t('chain-item.nodes-table.head.location'),
                t('chain-item.nodes-table.head.weight'),
              ].map(item => (
                <TableCell
                  padding="none"
                  className={classNames(classes.cell, classes.cellThead)}
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    {item}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} className={classes.row}>
                <TableCell padding="none" className={classes.nodeCell}>
                  {capitalize(row.organization || '')}
                </TableCell>

                <TableCell padding="none" className={classes.cell}>
                  {row.height || '-'}
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

                <TableCell className={classes.cell}>
                  {row.weight ? `${row.weight.toFixed(0)}%` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Box>
      </TableContainer>
    </>
  );
};
