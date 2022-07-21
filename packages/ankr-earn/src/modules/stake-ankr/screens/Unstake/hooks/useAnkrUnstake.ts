import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getValidatorDelegatedAmount } from 'modules/stake-ankr/actions/getValidatorDelegatedAmount';
import { unstake } from 'modules/stake-ankr/actions/unstake';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { IAnkrStakeSubmitPayload } from 'modules/stake-ankr/types';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

interface IUseAnkrUnstake {
  isUnstakeLoading: boolean;
  isAvailableUnstakeLoading: boolean;
  availableUnstake: BigNumber;
  minAmount: BigNumber;
  tokenIn: string;
  closeHref: string;
  isDisabled: boolean;
  providerId: string;
  providerName?: string;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
}

export const useAnkrUnstake = (): IUseAnkrUnstake => {
  const dispatchRequest = useDispatchRequest();

  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });
  const { data, loading: isBalanceLoading } = useQuery({
    type: getCommonData,
  });
  const { data: delegatedAmount, loading: isDelegatedAmountLoading } = useQuery(
    {
      type: getValidatorDelegatedAmount,
    },
  );

  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getCommonData());
    dispatchRequest(getValidatorDelegatedAmount({ validator: queryProvider }));
  }, [dispatchRequest]);

  const onSubmit = ({ provider, amount }: IAnkrStakeSubmitPayload) => {
    const readyAmount = new BigNumber(amount);
    dispatchRequest(
      unstake({
        provider,
        amount: readyAmount,
      }),
    );
  };

  return {
    isUnstakeLoading,
    isAvailableUnstakeLoading: isDelegatedAmountLoading,
    isDisabled:
      isProvidersLoading || isBalanceLoading || isDelegatedAmountLoading,
    availableUnstake: delegatedAmount ?? ZERO,
    minAmount: data?.minStake ?? ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    onSubmit,
  };
};
