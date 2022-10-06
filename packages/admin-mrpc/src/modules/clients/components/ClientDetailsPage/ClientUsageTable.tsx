import { IUsageEntity } from 'multirpc-sdk';
import {
  Paper,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';

interface IClientUsageTableProps {
  usage: IUsageEntity[];
}

export const ClientUsageTable = ({ usage }: IClientUsageTableProps) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }} component="p">
        Last 24 hours
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="actions table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>BlockChain</b>
              </TableCell>
              <TableCell>
                <b>Method</b>
              </TableCell>
              <TableCell>
                <b>Count</b>
              </TableCell>
              <TableCell>
                <b>Total cost</b>
              </TableCell>
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
    </>
  );
};
