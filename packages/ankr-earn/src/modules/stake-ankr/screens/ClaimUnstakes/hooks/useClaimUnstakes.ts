import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { ZERO } from 'modules/common/const';
import { useClaimAllForValidatorMutation } from 'modules/stake-ankr/actions/claimAllForValidator';
import { useClaimUnstakesMutation } from 'modules/stake-ankr/actions/claimUnstakes';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetClaimableUnstakesQuery } from 'modules/stake-ankr/actions/getClaimableUnstakes';
import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { useGetClaimableRewardsQuery } from '../../../actions/getClaimableRewards';
import { RoutesConfig } from '../../../RoutesConfig';

import { useAnalytics } from './useAnalytics';

interface IUseClaimUnstakes {
  loading: boolean;
  amount: BigNumber;
  rewards: BigNumber;
  tokenIn: string;
  usdTokenPrice?: BigNumber;
  closeHref: string;
  providerId: string;
  providerName: string;
  isClaimRewards: boolean;
  claimLoading: boolean;
  onClaimRewardsClick: () => void;
  onSubmit: () => void;
}

export const useClaimUnstakes = (): IUseClaimUnstakes => {
  const [claimAllForValidator, { isLoading: isClaimAllLoading }] =
    useClaimAllForValidatorMutation();
  const [claimUnstakes, { isLoading: isClaimLoading }] =
    useClaimUnstakesMutation();

  const [isClaimRewards, setIsClaimRewards] = useState(false);
  const onClaimRewardsClick = () => setIsClaimRewards(x => !x);

  const { provider: queryProvider = '' } = RoutesConfig.stake.useParams();

  const { data: providers } = useGetProvidersQuery();

  const { data: claimableUnstakes, isFetching: isClaimableUnstakesLoading } =
    useGetClaimableUnstakesQuery({ validator: queryProvider });

  const { data: claimableRewards, isFetching: isClaimableRewardsLoading } =
    useGetClaimableRewardsQuery({ validator: queryProvider });

  const { data: ankrPrice } = useGetAnkrPriceQuery();

  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const claimableRewardsAmount = claimableRewards ?? ZERO;
  const claimableUnstakesAmount = claimableUnstakes ?? ZERO;

  const { sendClaimAllAnalytics, sendClaimUnstakeAnalytics } = useAnalytics({
    totalAmount: claimableRewardsAmount.plus(claimableUnstakesAmount),
    unstakeAmount: claimableRewardsAmount,
  });

  const onSubmit = () => {
    if (isClaimRewards) {
      claimAllForValidator({ provider: queryProvider ?? '' })
        .unwrap()
        .catch(() => sendClaimAllAnalytics());
    } else {
      claimUnstakes({ provider: queryProvider ?? '' })
        .unwrap()
        .catch(() => sendClaimUnstakeAnalytics());
    }
  };

  return {
    loading: isClaimableUnstakesLoading || isClaimableRewardsLoading,
    amount: claimableUnstakesAmount,
    rewards: claimableRewardsAmount,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    claimLoading: isClaimLoading || isClaimAllLoading,
    usdTokenPrice: ankrPrice ?? ZERO,
    isClaimRewards,
    onClaimRewardsClick,
    onSubmit,
  };
};
