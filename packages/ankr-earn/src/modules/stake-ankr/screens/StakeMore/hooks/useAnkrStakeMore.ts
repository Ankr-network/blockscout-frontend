import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

interface IUseAnkrStake {
  loading: boolean;
  balance: BigNumber;
  apy?: BigNumber;
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
  minStake: BigNumber;
  providerId: string;
  providerName: string;
  onSubmit: () => void;
}

export const useAnkrStakeMore = (): IUseAnkrStake => {
  const dispatchRequest = useDispatchRequest();
  const onSubmit = () => {};

  const { data: providers } = useQuery({
    type: getProviders,
  });
  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { provider: queryProvider } = RoutesConfig.stakeMore.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getCommonData());
  }, [dispatchRequest]);

  return {
    loading: isCommonDataLoading,
    balance: ZERO,
    apy: ZERO,
    newTotalStake: ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(), // TODO: change it
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    minStake: commonData?.minStake ?? ZERO,
    onSubmit,
  };
};
