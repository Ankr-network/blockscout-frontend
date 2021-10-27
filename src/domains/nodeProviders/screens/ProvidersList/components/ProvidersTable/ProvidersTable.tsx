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
    rowsPerPage,
  } = usePagination(rows, 50);

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
                  {capitalize(t('providers.table.head.type'))}
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
                pageIndex * rowsPerPage,
                pageIndex * rowsPerPage + rowsPerPage,
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
                  {HAS_ORGANISATION && (
                    <TableCell padding="none" className={classes.cell}>
                      {row.organization || 'N/A'}
                    </TableCell>
                  )}
                  <TableCell padding="none" className={classes.cell}>
                    {t(`web3Schemes.${row.scheme}`)}
                  </TableCell>
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
