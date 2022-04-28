import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
import { ValidatorName } from 'modules/metrics/const';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';
import { calcYearlyEarning } from 'modules/stake/utils/calcYearlyEarning';

interface IStatsProps {
  apy: number;
  amount: BigNumber;
}

export const useStakeStats = ({
  apy,
  amount,
}: IStatsProps): IStakeStatsItem[] => {
  const dispatch = useDispatch();
  const { data: validatorsDetails } = useQuery({
    type: fetchValidatorsDetails,
  });

  const validatorDetails = useMemo(
    () =>
      validatorsDetails?.find(x => x.name === ValidatorName.ETH_VALIDATOR_NAME),
    [validatorsDetails],
  );

  const stats = useLocaleMemo<IStakeStatsItem[]>(() => {
    const shouldRenderTVL =
      validatorDetails?.totalStaked &&
      !validatorDetails.totalStaked.isNaN() &&
      !validatorDetails.totalStaked.isZero();

    const shouldRenderStakers =
      validatorDetails?.stakers &&
      !validatorDetails.stakers.isNaN() &&
      !validatorDetails.stakers.isZero();

    const res: IStakeStatsItem[] = [
      {
        label: t('stake.stats.apy'),
        value: t('stake.stats.apy-value', { value: apy }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.eth'),
        value: calcYearlyEarning(amount, apy).toFormat(),
      },
    ];

    if (shouldRenderTVL) {
      res.push({
        label: t('stake.stats.staked'),
        token: t('unit.eth'),
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
  }, [amount, apy]);

  useProviderEffect(() => {
    if (!validatorsDetails) {
      dispatch(fetchValidatorsDetails());
    }
  }, []);

  return stats;
};
