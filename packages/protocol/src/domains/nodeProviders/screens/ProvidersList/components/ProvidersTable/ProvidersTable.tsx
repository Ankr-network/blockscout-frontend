import React from 'react';
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
import { ProvidersTablePagination } from '../ProvidersTablePagination';
import { ProviderRow, ProvidersTableProps } from './ProvidersTableProps';
import { HAS_ORGANISATION } from './ProvidersTableUtils';
import { usePagination } from './usePagination';

import { useStyles } from './useStyles';

export const ProvidersTable = ({ data }: ProvidersTableProps) => {
  const classes = useStyles();

  const {
    isFirstPage,
    isLastPage,
    pageIndex,
    pagesCount,
    handleChangePage,
    rowsForCurrentPage,
  } = usePagination(data, 8);

  const renderTheadCell = (textId: string) => {
    return (
      <TableCell
        padding="none"
        className={classNames(classes.cell, classes.cellThead)}
      >
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.theadText}
        >
          {capitalize(t(textId))}
        </Typography>
      </TableCell>
    );
  };

  const renderRow = ({
    id,
    icon,
    chainName,
    country,
    city,
    continent,
    organization,
    scheme,
    totalNodes,
  }: ProviderRow) => {
    return (
      <TableRow key={id} className={classes.row}>
        <TableCell padding="none" className={classes.cell}>
          <img className={classes.logo} src={icon} alt={chainName} />
          {chainName}
        </TableCell>
        {country && (
          <TableCell
            padding="none"
            className={classNames(classes.cell, classes.countryCell)}
          >
            <ReactCountryFlag
              svg
              className={classes.flag}
              countryCode={country}
            />
            &nbsp; &nbsp;
            {city}
            &nbsp; ({t(`continents.${continent}`)})
          </TableCell>
        )}
        {HAS_ORGANISATION && (
          <TableCell padding="none" className={classes.cell}>
            {organization || 'N/A'}
          </TableCell>
        )}
        <TableCell padding="none" className={classes.cell}>
          {t(`web3Schemes.${scheme}`)}
        </TableCell>
        <TableCell padding="none" className={classes.cell}>
          {totalNodes}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root} elevation={0}>
        <Box component={Table} minWidth={600}>
          <TableHead className={classes.thead}>
            <TableRow>
              {renderTheadCell('providers.table.head.chain')}
              {renderTheadCell('providers.table.head.location')}
              {HAS_ORGANISATION &&
                renderTheadCell('providers.table.head.organization')}
              {renderTheadCell('providers.table.head.type')}
              {renderTheadCell('providers.table.head.total')}
            </TableRow>
          </TableHead>

          <TableBody>{rowsForCurrentPage.map(renderRow)}</TableBody>
        </Box>
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
