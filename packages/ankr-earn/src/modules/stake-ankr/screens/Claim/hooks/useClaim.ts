import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

interface IUseClaim {
  loading: boolean;
  claimable: BigNumber;
  epochEnd: Date;
  rewards: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerId: string;
  providerName: string;
  onSubmit: () => void;
}

export const useClaim = (): IUseClaim => {
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
  }, [dispatchRequest]);

  return {
    loading: false,
    claimable: ZERO,
    epochEnd: new Date(),
    rewards: ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(), // TODO: change it
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    onSubmit,
  };
};
