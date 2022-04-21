import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
import { ValidatorName } from 'modules/metrics/const';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';

interface IStatsProps {
  apy: BigNumber;
  amount: BigNumber;
}

const calculateYearlyEarning = (
  amount: BigNumber,
  apy: BigNumber,
): BigNumber => {
  return amount ? new BigNumber(amount).multipliedBy(apy).dividedBy(100) : ZERO;
};

export const useStakeStats = ({
  amount,
  apy,
}: IStatsProps): IStakeStatsItem[] => {
  const { data: validatorsDetails } = useQuery({
    type: fetchValidatorsDetails,
  });

  const validatorDetails = useMemo(
    () =>
      validatorsDetails?.find(x => x.name === ValidatorName.FTM_VALIDATOR_NAME),
    [validatorsDetails],
  );

  const shouldRenderTVL =
    validatorDetails?.totalStaked &&
    !validatorDetails.totalStaked.isNaN() &&
    !validatorDetails.totalStaked.isZero();

  const shouldRenderStakers =
    validatorDetails?.stakers &&
    !validatorDetails.stakers.isNaN() &&
    !validatorDetails.stakers.isZero();

  const apyVal = useMemo(
    () => apy.decimalPlaces(DEFAULT_ROUNDING).toFixed(),
    [apy],
  );

  const stats = useLocaleMemo(() => {
    const res: IStakeStatsItem[] = [
      {
        label: t('stake.stats.apy'),
        value: t('stake.stats.apy-value', { value: apyVal }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.ftm'),
        value: calculateYearlyEarning(amount, apy).toFormat(),
      },
    ];

    if (shouldRenderTVL) {
      res.push({
        label: t('stake.stats.staked'),
        token: t('unit.ftm'),
        value: validatorDetails.totalStaked.toFormat(DEFAULT_ROUNDING),
      });
    }

    if (shouldRenderStakers) {
      res.push({
        label: t('stake.stats.stakers'),
        value: validatorDetails.stakers.toFormat(),
      });
    }

    return res;
  }, [amount, apy, validatorDetails]);

  return stats;
};
