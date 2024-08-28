import { IRewardTx } from 'multirpc-sdk';
import { Table, TableContainer, TableRow } from '@mui/material';

import { Widget } from 'domains/referral/screens/ReferralPage/components/Widget';

import { BodyCell } from './components/BodyCell';
import { TableBody } from './components/TableBody';
import { TableHead } from './components/TableHead';
import { formatAmount } from './utils/formatAmount';
import { formatTimestamp } from './utils/formatTimestamp';
import { useBonusHistoryTableStyles } from './useBonusHistoryTableStyles';

export interface IBonusHistoryTableProps {
  isLoading?: boolean;
  txs: IRewardTx[];
}

export const BonusHistoryTable = ({
  isLoading,
  txs,
}: IBonusHistoryTableProps) => {
  const { classes } = useBonusHistoryTableStyles();

  return (
    <TableContainer component={Widget}>
      <Table classes={classes}>
        <TableHead />
        <TableBody hasPlaceholder={txs.length === 0} isLoading={isLoading}>
          {txs.map(({ amount, timestamp }) => (
            <TableRow key={timestamp}>
              <BodyCell>{formatTimestamp(timestamp)}</BodyCell>
              <BodyCell className={classes.amountCell}>
                {formatAmount(amount)}
              </BodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
