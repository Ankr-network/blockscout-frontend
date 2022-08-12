import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { claimAllForValidator } from 'modules/stake-ankr/actions/claimAllForValidator';
import { claimRewards } from 'modules/stake-ankr/actions/claimRewards';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getClaimableRewards } from 'modules/stake-ankr/actions/getClaimableRewards';
import { getClaimableUnstakes } from 'modules/stake-ankr/actions/getClaimableUnstakes';
import { getEpochEndSeconds } from 'modules/stake-ankr/actions/getEpochEndSeconds';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

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
  const dispatchRequest = useDispatchRequest();

  const [isClaimUnstakes, setIsClaimUnstakes] = useState(false);
  const onClaimRewardsClick = () => setIsClaimUnstakes(x => !x);

  const { data: epochEndsSeconds } = useQuery({
    type: getEpochEndSeconds,
  });
  const { data: claimableUnstakes, loading: isClaimableUnstakesLoading } =
    useQuery({ type: getClaimableUnstakes });
  const { data: claimableRewards, loading: isClaimableRewardsLoading } =
    useQuery({ type: getClaimableRewards });
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });

  const { provider: queryProvider } = RoutesConfig.stakeMore.useParams();

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getANKRPrice());
    dispatchRequest(getClaimableUnstakes({ validator: queryProvider }));
    dispatchRequest(getClaimableRewards({ validator: queryProvider }));
    dispatchRequest(getEpochEndSeconds());
  }, [dispatchRequest]);

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
        : `${t('stake-ankr.info-header.epoch-ends-days', {
            value: epochEndDays,
          })}`;
  }

  let hoursText;
  if (epochEndHours > 0) {
    hoursText =
      epochEndHours === 1
        ? `${t('stake-ankr.info-header.epoch-ends-hour', {
            value: epochEndHours,
          })}`
        : `${t('stake-ankr.info-header.epoch-ends-hours', {
            value: epochEndHours,
          })}`;
  }

  const minText = `${t('stake-ankr.info-header.epoch-ends-min', {
    value: epochEndMin,
  })}`;

  const onSubmit = () => {
    if (isClaimUnstakes) {
      dispatchRequest(claimAllForValidator({ provider: queryProvider ?? '' }));
    } else {
      dispatchRequest(claimRewards({ provider: queryProvider ?? '' }));
    }
  };

  return {
    loading: isClaimableUnstakesLoading || isClaimableRewardsLoading,
    amount: claimableRewards ?? ZERO,
    unstakes: claimableUnstakes ?? ZERO,
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
