import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText, useMemo } from 'react';

import { DEFAULT_ROUNDING, ZERO } from 'modules/common/const';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { fetchValidatorsDetails } from 'modules/metrics/actions/fetchValidatorsDetails';
import { ValidatorName } from 'modules/metrics/const';
import { IStakeStatsItem } from 'modules/stake/components/StakeStats';

import { useProviderEffect } from '../../../../auth/hooks/useProviderEffect';
import { fetchAPY } from '../../../actions/fetchAPY';

const calculateYearlyEarning = (
  amount: ReactText,
  apy: BigNumber,
): BigNumber => {
  return amount ? new BigNumber(amount).multipliedBy(apy).dividedBy(100) : ZERO;
};

interface IStatsProps {
  amount: ReactText;
  apy: BigNumber;
}

export const useStakeStats = ({
  amount,
  apy,
}: IStatsProps): IStakeStatsItem[] => {
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(fetchAPY());
  }, [dispatchRequest]);
  const { data: validatorsDetails } = useQuery({
    type: fetchValidatorsDetails,
  });

  const validatorDetails = useMemo(
    () =>
      validatorsDetails?.find(
        x => x.name === ValidatorName.POLYGON_VALIDATOR_NAME,
      ),
    [validatorsDetails],
  );

  const stats = useLocaleMemo(() => {
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
        value: t('stake.stats.apy-value', { value: apy.toFixed() }),
        tooltip: t('stake.stats.apy-tooltip'),
      },
      {
        label: t('stake.stats.yearly-earning'),
        token: t('unit.polygon'),
        value: calculateYearlyEarning(amount, apy).toFormat(),
      },
    ];

    if (shouldRenderTVL) {
      res.push({
        label: t('stake.stats.staked'),
        token: t('unit.polygon'),
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
