import { IRewardTx } from 'multirpc-sdk';

import {
  CommonTable,
  ITableColumn,
} from 'domains/referrals/screens/ReferralsPage/components/CommonTable';
import { formatAmount } from 'domains/referrals/screens/ReferralsPage/utils/formatAmount';
import { formatTimestamp } from 'domains/referrals/screens/ReferralsPage/utils/formatTimestamp';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { BodyRow } from './components/BodyRow';
import { MobileBodyRow } from './components/MobileBodyRow';
import { bonusPurposeTableTranslation } from './translation';
import { useBonusPurposeTableStyles } from './useBonusePurposeTableStyles';

export interface IBonusPurposeTableProps {
  columns: ITableColumn[];
  isLoading?: boolean;
  txs: IRewardTx[];
}

export const BonusPurposeTable = ({
  columns,
  isLoading,
  txs,
}: IBonusPurposeTableProps) => {
  const isMobile = useIsSMDown();

  const { classes } = useBonusPurposeTableStyles();
  const { keys, t } = useTranslation(bonusPurposeTableTranslation);

  return (
    <CommonTable
      columns={columns}
      hasPlaceholder={txs.length === 0}
      headCellClassName={classes.headCell}
      isLoading={isLoading}
      placeholder={t(keys.placeholder)}
    >
      {txs.map(({ amount, timestamp }) => {
        // only one type is presented at the moment - conversion
        const type = t(keys.type);
        // all the conversions must negative
        const formattedAmount = formatAmount({ amount: -amount });
        const formattedTimestamp = formatTimestamp(timestamp);

        if (isMobile) {
          return (
            <MobileBodyRow
              amount={formattedAmount}
              cellClassName={classes.bodyCell}
              key={timestamp}
              timestamp={formattedTimestamp}
              type={type}
            />
          );
        }

        return (
          <BodyRow
            amount={formattedAmount}
            key={timestamp}
            timestamp={formattedTimestamp}
            type={type}
          />
        );
      })}
    </CommonTable>
  );
};
