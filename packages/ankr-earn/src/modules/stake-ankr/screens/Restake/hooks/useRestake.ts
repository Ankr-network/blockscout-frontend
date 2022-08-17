import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getEpochEndSeconds } from 'modules/stake-ankr/actions/getEpochEndSeconds';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getRestakableAmount } from 'modules/stake-ankr/actions/getRestakableAmount';
import { getValidatorDelegatedAmount } from 'modules/stake-ankr/actions/getValidatorDelegatedAmount';
import { stake } from 'modules/stake-ankr/actions/stake';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';
import { getEndEpochText } from 'modules/stake-ankr/utils/getEndEpochText';

interface IUseRestake {
  loading: boolean;
  restakable: BigNumber;
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerId: string;
  providerName: string;
  epochEnds: string;
  lockingPeriod?: Days;
  onSubmit: () => void;
}

export const useRestake = (): IUseRestake => {
  const dispatchRequest = useDispatchRequest();

  const { data: providers } = useQuery({
    type: getProviders,
  });
  const { data: delegatedAmount, loading: isDelegatedAmountLoading } = useQuery(
    {
      type: getValidatorDelegatedAmount,
    },
  );
  const { data: commonData } = useQuery({
    type: getCommonData,
  });
  const { data: restakableAmount } = useQuery({
    type: getRestakableAmount,
  });
  const { data: epochEndsSeconds } = useQuery({
    type: getEpochEndSeconds,
  });

  const readyRestakableAmount = restakableAmount ?? ZERO;
  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getValidatorDelegatedAmount({ validator: queryProvider }));
    dispatchRequest(getRestakableAmount({ validator: queryProvider }));
    dispatchRequest(getEpochEndSeconds());
    dispatchRequest(getCommonData());
  }, [dispatchRequest]);

  const epochEnds = getEndEpochText(epochEndsSeconds ?? 0);

  const onSubmit = () => {
    dispatchRequest(
      stake({
        provider: queryProvider ?? '',
        amount: readyRestakableAmount,
      }),
    );
  };

  return {
    loading: isDelegatedAmountLoading,
    restakable: readyRestakableAmount,
    newTotalStake: delegatedAmount?.plus(readyRestakableAmount),
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    epochEnds,
    lockingPeriod: commonData?.lockingPeriod ?? undefined,
    onSubmit,
  };
};
