import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { YEARLY_INTEREST } from '../../../const';

export const useStakeStats = (amount: number) => {
  const stats: IStakeStatsItem[] = useLocaleMemo(
    () => [
      {
        label: t('stake.stats.apr'),
        value: `${YEARLY_INTEREST}%`,
      },
      {
        label: t('stake.stats.yearly-earning'),
        value: t('unit.token-value', {
          token: t('unit.polygon'),
          value: calcYearlyEarning(amount),
        }),
      },
      {
        label: t('stake.stats.staked-with-ankr'),
        // todo: get actual value
        value: '360,443 MATIC',
      },
      {
        label: t('stake.stats.stakers'),
        // todo: get actual value
        value: '66',
      },
    ],
    [amount],
  );

  return stats;
};

const calcYearlyEarning = (amount: number): number => {
  return (amount * YEARLY_INTEREST) / 100;
};
