import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
} from '@mui/material';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';
import { MappedTransaction } from '../../../actions/fetchUserTransactions';
import { useState } from 'react';

interface IClientTransactionsTable {
  transactions: MappedTransaction[];
}

const MAX_TRANSACTIONS_COUNT = 500;

export const ClientTransactionsTable = ({
  transactions,
}: IClientTransactionsTable) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (transactions.length <= 0) {
    return null;
  }

  const transactionsToRender = isCollapsed
    ? transactions.slice(0, MAX_TRANSACTIONS_COUNT)
    : transactions;

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>amount</b>
            </TableCell>
            <TableCell>
              <b>amountAnkr</b>
            </TableCell>
            <TableCell>
              <b>amountUsd</b>
            </TableCell>
            <TableCell>
              <b>blockchain</b>
            </TableCell>
            <TableCell>
              <b>Transaction time</b>
            </TableCell>
            <TableCell>
              <b>type</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsToRender.map(tx => (
            <TableRow key={tx.timestamp}>
              <TableCell>{renderBalance(tx.amount)}</TableCell>
              <TableCell>{renderBalance(tx.amountAnkr)}</TableCell>
              <TableCell>{renderUSD(tx.amountUsd)}</TableCell>
              <TableCell>{tx.blockchain}</TableCell>
              <TableCell>{tx.createdDate.toLocaleString()}</TableCell>
              <TableCell>{tx.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isCollapsed && transactionsToRender.length >= MAX_TRANSACTIONS_COUNT && (
        <Button
          sx={{ margin: '20px auto' }}
          size="medium"
          fullWidth
          color="secondary"
          onClick={() => setIsCollapsed(false)}
        >
          Show all
        </Button>
      )}
    </TableContainer>
  );
};
