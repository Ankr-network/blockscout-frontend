import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { claimAllForValidator } from 'modules/stake-ankr/actions/claimAllForValidator';
import { claimUnstakes } from 'modules/stake-ankr/actions/claimUnstakes';
import { getANKRPrice } from 'modules/stake-ankr/actions/getANKRPrice';
import { getClaimableRewards } from 'modules/stake-ankr/actions/getClaimableRewards';
import { getClaimableUnstakes } from 'modules/stake-ankr/actions/getClaimableUnstakes';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

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
  const dispatchRequest = useDispatchRequest();

  const [isClaimRewards, setIsClaimRewards] = useState(false);
  const onClaimRewardsClick = () => setIsClaimRewards(x => !x);

  const { data: providers } = useQuery({
    type: getProviders,
  });
  const { data: claimableUnstakes, loading: isClaimableUnstakesLoading } =
    useQuery({ type: getClaimableUnstakes });
  const { data: claimableRewards, loading: isClaimableRewardsLoading } =
    useQuery({ type: getClaimableRewards });
  const { data: ankrPrice } = useQuery({
    type: getANKRPrice,
  });

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getANKRPrice());
    dispatchRequest(getClaimableUnstakes({ validator: queryProvider }));
    dispatchRequest(getClaimableRewards({ validator: queryProvider }));
  }, [dispatchRequest]);

  const onSubmit = () => {
    if (isClaimRewards) {
      dispatchRequest(claimAllForValidator({ provider: queryProvider ?? '' }));
    } else {
      dispatchRequest(claimUnstakes({ provider: queryProvider ?? '' }));
    }
  };

  return {
    loading: isClaimableUnstakesLoading || isClaimableRewardsLoading,
    amount: claimableUnstakes ?? ZERO,
    rewards: claimableRewards ?? ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    claimLoading: false,
    usdTokenPrice: ankrPrice ?? ZERO,
    isClaimRewards,
    onClaimRewardsClick,
    onSubmit,
  };
};
