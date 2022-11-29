import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { IStakeSubmitPayload } from 'modules/delegate-stake/components/StakeForm/const';
import { useGetCommonDataQuery } from 'modules/stake-ankr/actions/getCommonData';
import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { useGetUnlockedDelegatedByValidatorQuery } from 'modules/stake-ankr/actions/getUnlockedDelegatedByValidator';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { useUnstakeANKRMutation } from '../../../actions/unstake';
import { RoutesConfig } from '../../../RoutesConfig';

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
  onChange?: (values: Partial<IStakeSubmitPayload>) => void;
  onSubmit: (values: IStakeSubmitPayload) => void;
}

export const useAnkrUnstake = (): IUseAnkrUnstake => {
  const [unstake, { isLoading: isUnstakeLoading }] = useUnstakeANKRMutation();

  const [amount, setAmount] = useState(ZERO);

  const { data: providers, isFetching: isProvidersLoading } =
    useGetProvidersQuery();

  const {
    data,
    isFetching: isBalanceLoading,
    refetch: getCommonDataRefetch,
  } = useGetCommonDataQuery();

  const { provider: queryProvider = '' } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );

  const {
    data: delegatedAmount,
    isFetching: isDelegatedAmountLoading,
    refetch: getDelegatedAmountRefetch,
  } = useGetUnlockedDelegatedByValidatorQuery({ validator: queryProvider });

  const availableUnstake = delegatedAmount ?? ZERO;
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const { sendAnalytics } = useAnalytics({
    amount,
    available: availableUnstake,
    balance: data?.ankrBalance ?? ZERO,
    nodeProvider: initialProvider ?? '',
  });

  useProviderEffect(() => {
    getCommonDataRefetch();
    getDelegatedAmountRefetch();
  }, []);

  const onSubmit = ({ provider, amount: formAmount }: IStakeSubmitPayload) => {
    const readyAmount = new BigNumber(formAmount);
    unstake({
      provider,
      amount: readyAmount,
    })
      .unwrap()
      .then(() => {
        sendAnalytics();
      });
  };

  const onChange = ({ amount: formAmount }: Partial<IStakeSubmitPayload>) => {
    const readyAmount = new BigNumber(formAmount ?? 0);
    setAmount(formAmount ? readyAmount : ZERO);
  };

  return {
    isUnstakeLoading,
    isAvailableUnstakeLoading: isDelegatedAmountLoading,
    isDisabled:
      isProvidersLoading ||
      isBalanceLoading ||
      isDelegatedAmountLoading ||
      isUnstakeLoading,
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
