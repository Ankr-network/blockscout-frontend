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
  amount?: BigNumber;
}

export const useStakeStats = ({
  apy,
  amount,
}: IStatsProps): IStakeStatsItem[] => {
  const { data: validatorsDetails } = useQuery({
    type: fetchValidatorsDetails,
  });

  const validatorDetails = useMemo(
    () =>
      validatorsDetails?.find(x => x.name === ValidatorName.BNB_VALIDATOR_NAME),
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

  const items = useLocaleMemo(() => {
    const res: IStakeStatsItem[] = [
      {
        label: t('stake.stats.apy'),
        value: `${apyVal}%`,
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.bnb'),
        value: calculateYearlyEarning(apyVal, amount).toFormat(),
      },
    ];

    if (shouldRenderTVL) {
      res.push({
        label: t('stake.stats.staked'),
        token: t('unit.bnb'),
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
  }, [amount, apyVal, validatorDetails]);

  return items;
};

function calculateYearlyEarning(apy: string, amount?: BigNumber): BigNumber {
  return amount ? new BigNumber(amount).multipliedBy(apy).dividedBy(100) : ZERO;
}
