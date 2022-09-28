import { IUsageEntity } from 'multirpc-sdk';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

interface IClientUsageTableProps {
  usage: IUsageEntity[];
}

export const ClientUsageTable = ({ usage }: IClientUsageTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="actions table">
        <TableHead>
          <TableRow>
            <TableCell>BlockChain</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Total cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usage.map(i =>
            i.details.map(d => (
              <TableRow key={d.method}>
                <TableCell>{i.blockchain}</TableCell>
                <TableCell>{d.method}</TableCell>
                <TableCell>{d.count}</TableCell>
                <TableCell>{d.totalCost}</TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
