import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getRestakableAmount } from 'modules/stake-ankr/actions/getRestakableAmount';
import { getValidatorDelegatedAmount } from 'modules/stake-ankr/actions/getValidatorDelegatedAmount';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

interface IUseRestake {
  loading: boolean;
  rewards: BigNumber;
  epochEnd: Date;
  restakable: BigNumber;
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerId: string;
  providerName: string;
  onSubmit: () => void;
}

export const useRestake = (): IUseRestake => {
  const dispatchRequest = useDispatchRequest();
  const onSubmit = () => {};

  const { data: providers } = useQuery({
    type: getProviders,
  });
  const { data: delegatedAmount, loading: isDelegatedAmountLoading } = useQuery(
    {
      type: getValidatorDelegatedAmount,
    },
  );
  const { data: restakableAmount } = useQuery({
    type: getRestakableAmount,
  });
  const { provider: queryProvider } = RoutesConfig.stakeMore.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getValidatorDelegatedAmount({ validator: queryProvider }));
    dispatchRequest(getRestakableAmount({ validator: queryProvider }));
  }, [dispatchRequest]);

  return {
    loading: isDelegatedAmountLoading,
    restakable: restakableAmount ?? ZERO,
    epochEnd: new Date(),
    newTotalStake: delegatedAmount?.plus(ZERO),
    rewards: ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(), // TODO: change it
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    onSubmit,
  };
};
