import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableSortLabel } from '@material-ui/core';

import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';

import { ClientMapped } from '../../store/clientsSlice';
import { UserTypeTag } from '../UserTypeTag';
import { useClientsTableSorting } from './useClientsTableSorting';
import { columns } from './clientTableUtils';
import { ClientsFilters } from '../ClientsFilters/ClientsFilters';
import { useClientsTableFiltering } from './useClientsTableFiltering';

export const ClientsTable = ({ clients }: { clients: ClientMapped[] }) => {
  const {
    filteredClients,
    filterClientType,
    handleFilterClientType,
    handleFilterKey,
    filterKey,
  } = useClientsTableFiltering({ clients });

  const { handleOrder, sortBy, sortOrder, sortedData } = useClientsTableSorting(
    {
      clients: filteredClients,
    },
  );

  return (
    <>
      <ClientsFilters
        filterClientType={filterClientType}
        handleFilterClientType={handleFilterClientType}
        handleFilterKey={handleFilterKey}
        filterKey={filterKey}
      />
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="clients table">
          <TableHead>
            <TableRow>
              {columns.map(({ key, label }) => {
                return (
                  <TableCell key={key} onClick={() => handleOrder(key)}>
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
            {sortedData.map(row => (
              <TableRow key={row.user}>
                <TableCell>{row.email}</TableCell>
                <TableCell component="th" scope="row">
                  {shrinkAddress(row.address) || 'No information'}
                </TableCell>
                <TableCell>{renderBalance(row.amount)}</TableCell>
                <TableCell>{renderBalance(row.voucherAmount)}</TableCell>
                <TableCell>{renderBalance(row.amountAnkr)}</TableCell>
                <TableCell>{renderUSD(row.amountUsd)}</TableCell>
                <TableCell>
                  <UserTypeTag
                    clientType={row.clientType}
                    clientTtl={row.ttl}
                  />
                </TableCell>
                <TableCell sortDirection="asc">
                  {row.createdDate.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
