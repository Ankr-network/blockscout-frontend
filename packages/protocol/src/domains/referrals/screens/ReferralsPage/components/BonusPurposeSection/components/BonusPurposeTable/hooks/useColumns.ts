import { useMemo } from 'react';

import { ITableColumn } from 'domains/referrals/screens/ReferralsPage/components/CommonTable';
import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { bonusPurposeTableTranslation } from '../translation';
import { stackStrings } from '../utils/stackStrings';

export const useColumns = () => {
  const isMobile = useIsSMDown();

  const { keys, t } = useTranslation(bonusPurposeTableTranslation);

  const dateColumn = t(keys.dateColumn);
  const typeColumn = t(keys.typeColumn);
  const pointsColumn = t(keys.pointsColumn);
  const creditsColumn = t(keys.creditsColumn);

  const columns = useMemo((): ITableColumn[] => {
    if (isMobile) {
      return [
        {
          title: stackStrings(dateColumn, typeColumn),
        },
        {
          align: 'right',
          title: stackStrings(pointsColumn, creditsColumn),
        },
      ];
    }

    return [
      {
        title: dateColumn,
      },
      {
        title: typeColumn,
      },
      {
        title: pointsColumn,
      },
      {
        title: creditsColumn,
      },
    ];
  }, [creditsColumn, dateColumn, isMobile, pointsColumn, typeColumn]);

  return { columns };
};
