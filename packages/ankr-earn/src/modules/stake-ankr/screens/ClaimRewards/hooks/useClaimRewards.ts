import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { t } from 'common';

import { ZERO } from 'modules/common/const';
import { useClaimAllForValidatorMutation } from 'modules/stake-ankr/actions/claimAllForValidator';
import { useClaimRewardsMutation } from 'modules/stake-ankr/actions/claimRewards';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetClaimableRewardsQuery } from 'modules/stake-ankr/actions/getClaimableRewards';
import { useGetClaimableUnstakesQuery } from 'modules/stake-ankr/actions/getClaimableUnstakes';
import { useGetEpochEndSecondsQuery } from 'modules/stake-ankr/actions/getEpochEndSeconds';

import { RoutesConfig } from '../../../RoutesConfig';

import { useAnalytics } from './useAnalytics';

interface IUseClaimRewards {
  loading: boolean;
  amount: BigNumber;
  unstakes: BigNumber;
  tokenIn: string;
  usdTokenPrice?: BigNumber;
  closeHref: string;
  isClaimUnstakes: boolean;
  claimLoading: boolean;
  epochEnds: string;
  onClaimRewardsClick: () => void;
  onSubmit: () => void;
}

export const useClaimRewards = (): IUseClaimRewards => {
  const [claimAllForValidator] = useClaimAllForValidatorMutation();
  const [claimRewards] = useClaimRewardsMutation();

  const [isClaimUnstakes, setIsClaimUnstakes] = useState(false);
  const onClaimRewardsClick = () => setIsClaimUnstakes(x => !x);

  const { data: epochEndsSeconds } = useGetEpochEndSecondsQuery(undefined, {
    pollingInterval: 30_000,
  });

  const { provider: queryProvider = '' } = RoutesConfig.stake.useParams();

  const { data: claimableUnstakes, isFetching: isClaimableUnstakesLoading } =
    useGetClaimableUnstakesQuery({ validator: queryProvider });

  const { data: claimableRewards, isFetching: isClaimableRewardsLoading } =
    useGetClaimableRewardsQuery({ validator: queryProvider });

  const { data: ankrPrice } = useGetAnkrPriceQuery();

  let seconds = epochEndsSeconds ?? 0;
  const epochEndDays = Math.trunc((seconds ?? 0) / (60 * 60 * 24));
  seconds -= epochEndDays * 60 * 60 * 24;
  const epochEndHours = Math.trunc((seconds ?? 0) / (60 * 60));
  seconds -= epochEndHours * 60 * 60;
  const epochEndMin = Math.trunc((seconds ?? 0) / 60);

  let daysText;
  if (epochEndDays > 0) {
    daysText =
      epochEndDays === 1
        ? `${t('stake-ankr.info-header.epoch-ends-day', {
            value: epochEndDays,
          })}`
        : `${t('stake-ankr.info-header.epoch-ends-day', {
            value: epochEndDays,
          })}`;
  }

  let hoursText;
  if (epochEndHours > 0) {
    hoursText = `${t('stake-ankr.info-header.epoch-ends-hour', {
      value: epochEndHours,
    })}`;
  }

  const minText = `${t('stake-ankr.info-header.epoch-ends-min', {
    value: epochEndMin,
  })}`;

  const claimableRewardsAmount = claimableRewards ?? ZERO;
  const claimableUnstakesAmount = claimableUnstakes ?? ZERO;

  const { sendClaimAllAnalytics, sendClaimRewardsAnalytics } = useAnalytics({
    totalAmount: claimableRewardsAmount.plus(claimableUnstakesAmount),
    rewardsAmount: claimableRewardsAmount,
  });

  const onSubmit = () => {
    if (isClaimUnstakes) {
      claimAllForValidator({ provider: queryProvider ?? '' })
        .unwrap()
        .catch(error => {
          if (!error) {
            sendClaimAllAnalytics();
          }
        });
    } else {
      claimRewards({ provider: queryProvider ?? '' })
        .unwrap()
        .catch(error => {
          if (!error) {
            sendClaimRewardsAnalytics();
          }
        });
    }
  };

  return {
    loading: isClaimableUnstakesLoading || isClaimableRewardsLoading,
    amount: claimableRewardsAmount,
    unstakes: claimableUnstakesAmount,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    claimLoading: false,
    usdTokenPrice: ankrPrice ?? ZERO,
    isClaimUnstakes,
    epochEnds: `
      ${daysText || ''}${daysText ? ',' : ''} 
      ${hoursText || ''}${hoursText ? ',' : ''} 
      ${minText}
    `,
    onClaimRewardsClick,
    onSubmit,
  };
};
