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
} from '@material-ui/core';
import classNames from 'classnames';
import ReactCountryFlag from 'react-country-flag';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';
import { ProvidersTablePagination } from '../ProvidersTablePagination';
import { ProvidersTableProps } from './ProvidersTableProps';
import {
  ROWS_PER_PAGE,
  HAS_ORGANISATION,
  usePagination,
  getRows,
} from './ProvidersTableUtils';

export const ProvidersTable = ({ data }: ProvidersTableProps) => {
  const classes = useStyles();

  const rows = useMemo(() => getRows(data), [data]);

  const {
    isFirstPage,
    isLastPage,
    pageIndex,
    pagesCount,
    handleChangePage,
  } = usePagination(rows);

  return (
    <>
      <TableContainer component={Paper} className={classes.root} elevation={0}>
        <Table aria-label="customized table">
          <TableHead className={classes.thead}>
            <TableRow>
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="body2" color="textSecondary">
                  {capitalize(t('providers.table.head.chain'))}
                </Typography>
              </TableCell>
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="body2" color="textSecondary">
                  {capitalize(t('providers.table.head.type'))}
                </Typography>
              </TableCell>
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="body2" color="textSecondary">
                  {capitalize(t('providers.table.head.location'))}
                </Typography>
              </TableCell>
              {HAS_ORGANISATION && (
                <TableCell
                  padding="none"
                  className={classNames(classes.cell, classes.cellThead)}
                >
                  <Typography variant="body2" color="textSecondary">
                    {capitalize(t('providers.table.head.organization'))}
                  </Typography>
                </TableCell>
              )}
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="body2" color="textSecondary">
                  {capitalize(t('providers.table.head.total'))}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(
                pageIndex * ROWS_PER_PAGE,
                pageIndex * ROWS_PER_PAGE + ROWS_PER_PAGE,
              )
              .map(row => (
                <TableRow key={row.id} className={classes.row}>
                  <TableCell padding="none" className={classes.cell}>
                    <img
                      className={classes.logo}
                      src={row.icon}
                      alt={row.chainName}
                    />
                    {row.chainName}
                  </TableCell>
                  <TableCell padding="none" className={classes.cell}>
                    {row.scheme}
                  </TableCell>
                  {row.country && (
                    <TableCell padding="none" className={classes.cell}>
                      <ReactCountryFlag svg countryCode={row.country} />
                      &nbsp;
                      {row.country}
                      &nbsp; ({t(`continents.${row.continent}`)})
                    </TableCell>
                  )}
                  {HAS_ORGANISATION && (
                    <TableCell padding="none" className={classes.cell}>
                      {row.organization}
                    </TableCell>
                  )}
                  <TableCell padding="none" className={classes.cell}>
                    {row.totalNodes}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagesCount > 1 && (
        <ProvidersTablePagination
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          pageIndex={pageIndex}
          pagesCount={pagesCount}
          onPageChange={handleChangePage}
        />
      )}
    </>
  );
};
