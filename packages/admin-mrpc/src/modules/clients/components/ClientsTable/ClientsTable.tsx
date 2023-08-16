import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TableSortLabel,
  Tooltip,
  Button,
} from '@mui/material';

import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import {
  formatNumber,
  renderBalance,
  renderUSD,
} from 'modules/common/utils/renderBalance';

import { ClientMapped } from '../../store/clientsSlice';
import { UserTypeTag } from '../UserTypeTag';
import { useClientsTableSorting } from './useClientsTableSorting';
import { columns } from './clientTableUtils';
import { ClientsTypeFilters } from '../ClientsTypeFilters';
import { useClientsTableFiltering } from './useClientsTableFiltering';
import { ClientsRoutesConfig } from '../../ClientsRoutesConfig';
import { useClientsTableStyles } from './ClientsTableStyles';
import { ClientsValueFilters } from '../ClientsValueFilters/ClientsValueFilters';
import { ButtonOptions } from './ButtonOptions';
import { getTtlString } from '../UserTypeTag/const';

const MAX_ON_PAGE = 50;

/* eslint-disable max-lines-per-function */
export const ClientsTable = ({
  clients = [],
  activeItemAddress,
}: {
  clients?: ClientMapped[];
  activeItemAddress?: string;
}) => {
  const history = useHistory();
  const { classes, cx } = useClientsTableStyles();
  const {
    filteredClients,
    filterClientType,
    handleFilterClientType,
    handleFilterKey,
    filterKeys,
  } = useClientsTableFiltering({ clients });

  const { handleOrder, sortBy, sortOrder, sortedData } = useClientsTableSorting(
    {
      clients: filteredClients,
    },
  );

  const [isCollapsed, setIsCollapsed] = useState(true);

  const collapsedData = isCollapsed
    ? sortedData.slice(0, MAX_ON_PAGE)
    : sortedData;
  const isShowMore = sortedData.length > MAX_ON_PAGE;

  const handleRowClick = (row: ClientMapped) => {
    if (!row.address) {
      return;
    }

    history.push({
      pathname: ClientsRoutesConfig.clientInfo.generatePath(row.address),
    });
  };

  return (
    <>
      <ClientsTypeFilters
        filterClientType={filterClientType}
        handleFilterClientType={handleFilterClientType}
      />
      <ClientsValueFilters
        handleFilterKey={handleFilterKey}
        filterKeys={filterKeys}
      />
      <TableContainer className={classes.tableContainer} component={Box}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="clients table"
        >
          <TableHead>
            <TableRow>
              {columns.map(({ key, label }) => {
                return (
                  <TableCell
                    key={key}
                    onClick={() => handleOrder(key as keyof ClientMapped)}
                    className={classes.headerCell}
                  >
                    <TableSortLabel
                      active={sortBy === key}
                      direction={sortOrder}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {collapsedData.map(row => {
              const isActive = row.address === activeItemAddress;

              return (
                <TableRow
                  className={cx(
                    classes.row,
                    Boolean(row.address) && classes.rowClickable,
                    isActive && classes.rowActive,
                  )}
                  key={row.user || row.address}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell title={row.email} className={classes.cell}>
                    {row.email}
                  </TableCell>
                  <Tooltip title={row.address || ''}>
                    <TableCell className={classes.cell}>
                      <>{shrinkAddress(row.address) || 'No information'}</>
                    </TableCell>
                  </Tooltip>
                  <TableCell className={classes.cell}>
                    {formatNumber(row.amount)}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {formatNumber(row.creditVoucherAmount)}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {renderBalance(row.amountAnkr)}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {renderUSD(row.amountUsd)}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <UserTypeTag
                      clientType={row.clientType}
                      clientTtl={row.ttl}
                    />
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {row.ttl && row.ttl > 0 ? getTtlString(row.ttl) : '-'}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {row.createdDate?.toLocaleDateString() || 'unknown'}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <ButtonOptions client={row} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {isCollapsed && isShowMore && (
          <Button
            size="extraLarge"
            fullWidth
            color="secondary"
            onClick={() => setIsCollapsed(false)}
          >
            Show All
          </Button>
        )}
      </TableContainer>
    </>
  );
};
