import { TableRow } from '@mui/material';

import { BodyCell } from 'domains/referral/screens/ReferralPage/components/CommonTable';

import { stackStrings } from '../../utils/stackStrings';

export interface IMobileBodyRowProps {
  amount: string;
  cellClassName?: string;
  timestamp: string;
  type: string;
}

export const MobileBodyRow = ({
  amount,
  cellClassName,
  timestamp,
  type,
}: IMobileBodyRowProps) => {
  return (
    <TableRow>
      <BodyCell className={cellClassName}>
        {stackStrings(timestamp, type)}
      </BodyCell>
      <BodyCell align="right" className={cellClassName}>
        {stackStrings(amount, amount)}
      </BodyCell>
    </TableRow>
  );
};
