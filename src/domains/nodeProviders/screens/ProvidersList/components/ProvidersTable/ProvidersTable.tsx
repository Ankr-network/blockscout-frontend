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
} from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './ProvidersTableStyles';
import { chainsMock } from './chainsMock';
import { ProvidersTablePagination } from '../ProvidersTablePagination';
import { CHAINS_MOCK } from '../../../../../chains/screens/Chains/components/ChainsList/ChainsListMock';
import { flagEmojies } from './flagEmojiesMock';

function createData(
  id: string,
  chain: string,
  logo: string,
  type: string,
  location: string | null,
  flag: string,
  organization?: string,
) {
  return { id, chain, logo, type, location, flag, organization };
}

const getRandomItemFromArray = (array: Array<any>) =>
  array[Math.floor(Math.random() * array.length)];

const rows = chainsMock.map(chain => {
  const chainItem = getRandomItemFromArray(CHAINS_MOCK);
  const randomFlag = getRandomItemFromArray(flagEmojies);

  return createData(
    chain.id,
    capitalize(chainItem.name),
    chainItem.chainLogo,
    chain.scheme,
    randomFlag.name,
    randomFlag.flag,
    chainItem.name,
  );
});

const rowsPerPage = 8;

export const ProvidersTable = () => {
  const classes = useStyles();
  const [pageIndex, setPageIndex] = React.useState(0);

  const pageNumber = pageIndex + 1;
  const pagesCount = Math.ceil(rows.length / rowsPerPage);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageNumber === pagesCount;

  const handleChangePage = (newPage: number) => {
    if (isFirstPage && newPage <= pageIndex) {
      return;
    }
    if (isLastPage && newPage >= pageIndex) {
      return;
    }
    setPageIndex(newPage);
  };

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
              <TableCell
                padding="none"
                className={classNames(classes.cell, classes.cellThead)}
              >
                <Typography variant="body2" color="textSecondary">
                  {capitalize(t('providers.table.head.organization'))}
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
                      src={row.logo}
                      alt={row.chain}
                    />
                    {row.chain}
                  </TableCell>
                  <TableCell padding="none" className={classes.cell}>
                    {row.type}
                  </TableCell>
                  <TableCell padding="none" className={classes.cell}>
                    {row.flag}
                    {row.location}
                  </TableCell>
                  <TableCell padding="none" className={classes.cell}>
                    {row.organization}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProvidersTablePagination
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        pageIndex={pageIndex}
        pagesCount={pagesCount}
        onPageChange={handleChangePage}
      />
    </>
  );
};
