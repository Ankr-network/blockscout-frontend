import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { IAnkrStakeSubmitPayload } from 'modules/delegate-stake/components/StakeForm/const';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getUnlockedDelegatedByValidator } from 'modules/stake-ankr/actions/getUnlockedDelegatedByValidator';
import { unstake } from 'modules/stake-ankr/actions/unstake';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { useAnalytics } from './useAnalytics';

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
  onChange?: (values: Partial<IAnkrStakeSubmitPayload>) => void;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
}

export const useAnkrUnstake = (): IUseAnkrUnstake => {
  const dispatchRequest = useDispatchRequest();

  const [amount, setAmount] = useState(ZERO);

  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });
  const { data, loading: isBalanceLoading } = useQuery({
    type: getCommonData,
  });
  const { data: delegatedAmount, loading: isDelegatedAmountLoading } = useQuery(
    {
      type: getUnlockedDelegatedByValidator,
    },
  );

  const availableUnstake = delegatedAmount ?? ZERO;
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const { sendAnalytics } = useAnalytics({
    amount,
    available: availableUnstake,
    balance: data?.ankrBalance ?? ZERO,
    nodeProvider: initialProvider ?? '',
  });

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getCommonData());
    dispatchRequest(
      getUnlockedDelegatedByValidator({ validator: queryProvider }),
    );
  }, [dispatchRequest]);

  const onSubmit = ({
    provider,
    amount: formAmount,
  }: IAnkrStakeSubmitPayload) => {
    const readyAmount = new BigNumber(formAmount);
    dispatchRequest(
      unstake({
        provider,
        amount: readyAmount,
      }),
    ).then(({ error }) => {
      if (!error) {
        sendAnalytics();
      }
    });
  };

  const onChange = ({
    amount: formAmount,
  }: Partial<IAnkrStakeSubmitPayload>) => {
    const readyAmount = new BigNumber(formAmount ?? 0);
    setAmount(formAmount ? readyAmount : ZERO);
  };

  return {
    isUnstakeLoading,
    isAvailableUnstakeLoading: isDelegatedAmountLoading,
    isDisabled:
      isProvidersLoading || isBalanceLoading || isDelegatedAmountLoading,
    availableUnstake,
    minAmount: data?.minStake ?? ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    onChange,
    onSubmit,
  };
};
