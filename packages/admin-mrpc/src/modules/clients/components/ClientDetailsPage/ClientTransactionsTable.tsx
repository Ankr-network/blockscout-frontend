import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import { ITransactionsEntity } from 'multirpc-sdk';
import { renderBalance, renderUSD } from 'modules/common/utils/renderBalance';
import { useClientDetailsStyles as useStyles } from './ClientDetailsStyles';

interface IClientTransactionsTable {
  transactions: ITransactionsEntity[];
}

export const ClientTransactionsTable = ({
  transactions,
}: IClientTransactionsTable) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.transactionsWrapper}>
      <Typography
        variant="h3"
        component="p"
        className={classes.transactionsTitle}
      >
        Transactions
      </Typography>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>amount</TableCell>
            <TableCell>amountAnkr</TableCell>
            <TableCell>amountUsd</TableCell>
            <TableCell>blockchain</TableCell>
            <TableCell>timestamp</TableCell>
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
              <TableCell>{tx.timestamp}</TableCell>
              <TableCell>{tx.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
