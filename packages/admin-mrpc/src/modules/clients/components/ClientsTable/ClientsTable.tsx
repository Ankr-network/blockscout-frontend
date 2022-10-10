import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';

import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';

import { ClientMapped } from '../../store/clientsSlice';
import { UserTypeTag } from '../UserTypeTag';
import { useClientsTableSorting } from './useClientsTableSorting';
import { columns } from './clientTableUtils';
import { ClientsTypeFilters } from '../ClientsTypeFilters';
import { useClientsTableFiltering } from './useClientsTableFiltering';
import { ClientsRoutesConfig } from '../../ClientsRoutesConfig';
import { useClientsTableStyles } from './ClientsTableStyles';
import { ClientsValueFilters } from '../ClientsValueFilters/ClientsValueFilters';

export const ClientsTable = ({ clients }: { clients: ClientMapped[] }) => {
  const history = useHistory();
  const classes = useClientsTableStyles();
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
        filterKey={filterKey}
      />
      <TableContainer component={Box}>
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
                    onClick={() => handleOrder(key)}
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
            {sortedData.map(row => (
              <TableRow
                className={classNames(
                  classes.row,
                  Boolean(row.address) && classes.rowClickable,
                )}
                key={row.user}
                onClick={() => handleRowClick(row)}
              >
                <TableCell className={classes.cell}>{row.email}</TableCell>
                <Tooltip title={row.address || ''}>
                  <TableCell className={classes.cell}>
                    <>{shrinkAddress(row.address) || 'No information'}</>
                  </TableCell>
                </Tooltip>
                <TableCell className={classes.cell}>
                  {renderBalance(row.amount)}
                </TableCell>
                <TableCell className={classes.cell}>
                  {renderBalance(row.voucherAmount)}
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
