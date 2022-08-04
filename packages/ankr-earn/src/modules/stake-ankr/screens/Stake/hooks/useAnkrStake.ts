import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { t } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { approve } from 'modules/stake-ankr/actions/approve';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { stake } from 'modules/stake-ankr/actions/stake';
import { ANKR_STAKE_FORM_ID } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import {
  IAnkrFormState,
  IAnkrStakeSubmitPayload,
} from 'modules/stake-ankr/types';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { useFormState } from '../../../../forms/hooks/useFormState';

interface IUseAnkrStake {
  isStakeLoading: boolean;
  isBalanceLoading: boolean;
  isApproveLoading: boolean;
  isDisabled: boolean;
  isApproved: boolean;
  balance: BigNumber;
  minStake: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerSelectHref: string;
  initialProvider?: string;
  initialAmount?: string;
  providerName?: string;
  lockingPeriod?: Days;
  amount: BigNumber;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
  onChange?: (
    values: Partial<IAnkrStakeSubmitPayload>,
    invalid: boolean,
  ) => void;
}

export const useAnkrStake = (): IUseAnkrStake => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { setFormState, formState } =
    useFormState<IAnkrFormState>(ANKR_STAKE_FORM_ID);

  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });

  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });

  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approve,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getCommonData());
    dispatchRequest(getAPY());

    return () => {
      dispatch(resetRequests([approve.toString()]));
    };
  }, []);

  const amount = formState?.amount;

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const isApproved = !!approveData;

  const onChange = ({
    amount: formAmount,
  }: Partial<IAnkrStakeSubmitPayload>) => {
    const readyAmount = formAmount ? new BigNumber(formAmount) : undefined;
    dispatch(setFormState({ amount: readyAmount }));
  };

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

  return {
    isStakeLoading,
    isBalanceLoading: isCommonDataLoading,
    isApproveLoading,
    isApproved,
    isDisabled:
      isProvidersLoading ||
      isCommonDataLoading ||
      isStakeLoading ||
      isApproveLoading,
    balance: commonData?.ankrBalance ?? ZERO,
    minStake: commonData?.minStake ?? ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerSelectHref: RoutesConfig.selectProvider.generatePath(),
    initialProvider,
    providerName,
    lockingPeriod: commonData?.lockingPeriod ?? undefined,
    amount: amount ?? ZERO,
    initialAmount: amount?.toString(),
    onChange,
    onSubmit,
  };
};
