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
import {
  IFormState,
  IAnkrStakeFormPayload,
  IAnkrStakeSubmitPayload,
} from 'modules/delegate-stake/components/StakeForm/const';
import { approve } from 'modules/stake-ankr/actions/approve';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { stake } from 'modules/stake-ankr/actions/stake';
import { ANKR_STAKE_FORM_ID, TEMPORARY_APY } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
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
  amount: BigNumber;
  apy: BigNumber;
  quoteText: string;
  additionalText?: string;
  additionalTooltip?: string;
  additionalValue?: string;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
  onChange?: (values: IAnkrStakeFormPayload, invalid: boolean) => void;
}

export const useAnkrStake = (): IUseAnkrStake => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { setFormState, formState } =
    useFormState<IFormState>(ANKR_STAKE_FORM_ID);

  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });
  const { data: commonData, loading: isCommonDataLoading } = useQuery({
    type: getCommonData,
  });
  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approve,
  });
  const { data: apyData } = useQuery({
    type: getAPY,
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

  const currentProvider = providers ? providers[0] : null;
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);
  const apyItem = apyData?.find(x => x.validator === initialProvider);
  const apy = apyItem ? apyItem.apy : TEMPORARY_APY;

  const isApproved = !!approveData;

  const lockingPeriod = commonData?.lockingPeriod ?? undefined;

  const onChange = ({ amount: formAmount }: IAnkrStakeFormPayload) => {
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
    amount: amount ?? ZERO,
    initialAmount: amount?.toFixed(),
    apy,
    quoteText: t('stake-ankr.staking.fee-info'),
    additionalText: t('stake-ankr.staking.locking-period'),
    additionalTooltip: t('stake-ankr.staking.locking-period-tooltip'),
    additionalValue: t('stake-ankr.staking.locking-period-value', {
      days: lockingPeriod,
    }),
    onChange,
    onSubmit,
  };
};
