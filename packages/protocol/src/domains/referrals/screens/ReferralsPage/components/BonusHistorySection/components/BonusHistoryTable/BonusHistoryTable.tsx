import { IRewardTx } from 'multirpc-sdk';
import { TableRow } from '@mui/material';

import {
  BodyCell,
  CommonTable,
  ITableColumn,
} from 'domains/referrals/screens/ReferralsPage/components/CommonTable';
import { formatAmount } from 'domains/referrals/screens/ReferralsPage/utils/formatAmount';
import { formatTimestamp } from 'domains/referrals/screens/ReferralsPage/utils/formatTimestamp';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { bonusHistoryTableTranslation } from './translation';
import { useBonusHistoryTableStyles } from './useBonusHistoryTableStyles';

export interface IBonusHistoryTableProps {
  columns: ITableColumn[];
  isLoading?: boolean;
  txs: IRewardTx[];
}

export const BonusHistoryTable = ({
  columns,
  isLoading,
  txs,
}: IBonusHistoryTableProps) => {
  const { classes } = useBonusHistoryTableStyles();
  const { keys, t } = useTranslation(bonusHistoryTableTranslation);

  return (
    <CommonTable
      columns={columns}
      hasCopyLinkButtonInPlaceholder
      hasPlaceholder={txs.length === 0}
      isLoading={isLoading}
      placeholder={t(keys.placeholder)}
    >
      {txs.map(({ amount, timestamp }) => (
        <TableRow key={timestamp}>
          <BodyCell>{formatTimestamp(timestamp)}</BodyCell>
          <BodyCell className={classes.amountCell}>
            {formatAmount({ amount, hasSign: true })}
          </BodyCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};
