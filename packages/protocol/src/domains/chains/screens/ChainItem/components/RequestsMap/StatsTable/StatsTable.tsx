import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  SimplePaletteColorOptions,
  TableHead,
} from '@mui/material';

import { t } from '@ankr.com/common';
import { palette as PALETTE } from '@ankr.com/ui';
import { useStyles } from './useStyles';
import { StatsTableProps } from './StatsTableTypes';
import { StatusCircle } from 'uiKit/StatusCircle';

export const StatsTable = ({ data, selectedCountry }: StatsTableProps) => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.table} elevation={0}>
        <Box component={Table} minWidth={230}>
          <TableHead className={classes.thead}>
            <TableRow>
              {[
                t('chain-item.map.stats-table.head.country'),
                t('chain-item.map.stats-table.head.requests'),
              ].map(item => (
                <TableCell className={classes.cellThead} key={item}>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className={classes.subtitle2}
                  >
                    {item}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            {data.map(country => {
              const { color, name, requests, isoA2 } = country;

              const isSelectedCountry = selectedCountry === isoA2;

              return (
                <TableRow
                  key={name}
                  className={cx(
                    classes.row,
                    isSelectedCountry ? classes.selected : '',
                  )}
                >
                  <TableCell padding="none" className={classes.firstCell}>
                    <StatusCircle
                      mr={1.25}
                      color={
                        isSelectedCountry
                          ? (PALETTE?.primary as SimplePaletteColorOptions).main
                          : color
                      }
                    />

                    <Typography variant="h6" className={classes.name}>
                      {name}
                    </Typography>
                  </TableCell>

                  <TableCell padding="none" className={classes.secondCell}>
                    <Typography variant="h6" className={classes.requests}>
                      {requests}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Box>
      </TableContainer>
    </div>
  );
};
