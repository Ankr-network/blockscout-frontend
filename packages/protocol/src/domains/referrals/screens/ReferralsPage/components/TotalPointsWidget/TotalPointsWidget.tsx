import BigNumber from 'bignumber.js';
import { AddUser, WalletUpIcon } from '@ankr.com/ui';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { NUMBERS_FORMATTING_TRESHOLD } from '../../const';
import { Summary } from '../Summary';
import { SummaryWidget } from '../SummaryWidget';
import { totalPointsWidgetTranslation } from './translation';
import { useTotalPointsWidgetStyles } from './useTotalPointsWidgetStyles';

export interface ITotalPointsWidgetProps {
  activeReferrals: number;
  referralsLoading?: boolean;
  totalPoints: number;
  totalPointsLoading?: boolean;
  totalReferrals: number;
}

export const TotalPointsWidget = ({
  activeReferrals,
  referralsLoading,
  totalPoints,
  totalPointsLoading,
  totalReferrals,
}: ITotalPointsWidgetProps) => {
  const referrals = `${activeReferrals} / ${totalReferrals}`;

  const { classes } = useTotalPointsWidgetStyles();
  const { keys, t } = useTranslation(totalPointsWidgetTranslation);

  const formattedPoints = new BigNumber(totalPoints).toFormat();

  const [points, tooltip] =
    totalPoints < NUMBERS_FORMATTING_TRESHOLD
      ? [formattedPoints, undefined]
      : [t(keys.totalPoints, { totalPoints }), formattedPoints];

  return (
    <SummaryWidget title={t(keys.title)}>
      <div className={classes.stats}>
        <Summary
          Icon={WalletUpIcon}
          isLoading={totalPointsLoading}
          title={t(keys.totalPointsTitle)}
          tooltip={tooltip}
        >
          {points}
        </Summary>
        <Summary
          Icon={AddUser}
          isLoading={referralsLoading}
          title={t(keys.referralsTitle)}
        >
          {referrals}
        </Summary>
      </div>
    </SummaryWidget>
  );
};
