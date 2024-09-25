import { TableRow } from '@mui/material';

import { BodyCell } from 'domains/referrals/screens/ReferralsPage/components/CommonTable';

export interface IBodyRowProps {
  amount: string;
  timestamp: string;
  type: string;
}

export const BodyRow = ({ amount, timestamp, type }: IBodyRowProps) => {
  return (
    <TableRow>
      <BodyCell>{timestamp}</BodyCell>
      <BodyCell>{type}</BodyCell>
      <BodyCell>{amount}</BodyCell>
      {/* amount in bonus points is equal to amount in credits */}
      <BodyCell>{amount}</BodyCell>
    </TableRow>
  );
};
