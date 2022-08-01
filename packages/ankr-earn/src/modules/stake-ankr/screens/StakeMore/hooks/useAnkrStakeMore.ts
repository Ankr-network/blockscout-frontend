import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { approve } from 'modules/stake-ankr/actions/approve';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { stake } from 'modules/stake-ankr/actions/stake';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { IAnkrStakeSubmitPayload } from 'modules/stake-ankr/types';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

interface IUseAnkrStake {
  isStakeLoading: boolean;
  isBalanceLoading: boolean;
  isApproveLoading: boolean;
  isDisabled: boolean;
  isApproved: boolean;
  balance: BigNumber;
  apy?: BigNumber;
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
  minStake: BigNumber;
  providerId: string;
  providerName: string;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
  onChange?: (
    values: Partial<IAnkrStakeSubmitPayload>,
    invalid: boolean,
  ) => void;
}

export const useAnkrStakeMore = (): IUseAnkrStake => {
  const dispatchRequest = useDispatchRequest();

  const [amount, setAmount] = useState(ZERO);
  const [isError, setIsError] = useState(false);

  const { data: providers } = useQuery({
    type: getProviders,
  });
  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });
  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approve,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { provider: queryProvider } = RoutesConfig.stakeMore.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const isApproved = !!approveData;

  const balance = commonData?.ankrBalance ?? ZERO;

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getCommonData());
  }, [dispatchRequest]);

  const onSubmit = ({
    provider,
    amount: formAmount,
  }: IAnkrStakeSubmitPayload) => {
    const readyAmount = new BigNumber(formAmount);
    if (isApproved) {
      dispatchRequest(
        stake({
          provider,
          amount: readyAmount,
        }),
      );
    } else {
      dispatchRequest(approve(readyAmount));
    }
  };

  const onChange = (
    { amount: formAmount }: Partial<IAnkrStakeSubmitPayload>,
    invalid: boolean,
  ) => {
    const readyAmount = new BigNumber(formAmount ?? 0);
    setAmount(formAmount ? readyAmount : ZERO);
    setIsError(invalid);
  };

  const newTotalStake = useMemo(() => {
    if (isError) return balance;
    return balance.plus(amount);
  }, [amount, balance, isError]);

  return {
    isStakeLoading,
    isBalanceLoading: isCommonDataLoading,
    isApproveLoading,
    isApproved,
    balance,
    isDisabled: isCommonDataLoading || isStakeLoading || isApproveLoading,
    apy: ZERO,
    newTotalStake,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    minStake: commonData?.minStake ?? ZERO,
    onChange,
    onSubmit,
  };
};
