import { useMemo } from 'react';

import { ITableColumn } from 'domains/referrals/screens/ReferralsPage/components/CommonTable';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { bonusHistoryTableTranslation } from '../translation';

export const useColumns = () => {
  const isMobile = useIsSMDown();

  const { keys, t } = useTranslation(bonusHistoryTableTranslation);

  const dateColumn = t(keys.dateColumn);
  const amountColumn = t(keys.amountColumn);

  const columns = useMemo(
    (): ITableColumn[] => [
      {
        title: dateColumn,
      },
      {
        align: isMobile ? 'right' : 'left',
        title: amountColumn,
      },
    ],
    [amountColumn, dateColumn, isMobile],
  );

  return { columns };
};
