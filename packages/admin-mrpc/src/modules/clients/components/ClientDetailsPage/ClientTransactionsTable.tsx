import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';
import { MappedTransaction } from '../../actions/fetchUserTransactions';

interface IClientTransactionsTable {
  transactions: MappedTransaction[];
}

export const ClientTransactionsTable = ({
  transactions,
}: IClientTransactionsTable) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell>amount</TableCell>
            <TableCell>amountAnkr</TableCell>
            <TableCell>amountUsd</TableCell>
            <TableCell>blockchain</TableCell>
            <TableCell>Transaction time</TableCell>
            <TableCell>type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(tx => (
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
    </TableContainer>
  );
};
