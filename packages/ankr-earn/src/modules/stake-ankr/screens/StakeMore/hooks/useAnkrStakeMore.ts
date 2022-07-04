import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

interface IUseAnkrStake {
  loading: boolean;
  balance: BigNumber;
  apy?: BigNumber;
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
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
  const { provider: queryProvider } = RoutesConfig.stakeMore.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  useProviderEffect(() => {
    dispatchRequest(getProviders());
  }, []);

  return {
    loading: false,
    balance: ZERO,
    apy: ZERO,
    newTotalStake: ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName,
    onSubmit,
  };
};

// todo: refactor
function getDemoProviderName(addr?: string) {
  return addr || 'Mind Heart Sou0l';
}
