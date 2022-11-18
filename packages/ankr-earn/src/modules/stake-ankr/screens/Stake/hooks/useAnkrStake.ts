import { t, tHTML } from '@ankr.com/common';
import { resetRequests } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import {
  IStakeFormPayload,
  IStakeSubmitPayload,
  IFormState,
} from 'modules/delegate-stake/components/StakeForm/const';
import { useFormState } from 'modules/forms/hooks/useFormState';
import { useGetCommonDataQuery } from 'modules/stake-ankr/actions/getCommonData';
import { useGetProvidersQuery } from 'modules/stake-ankr/actions/getProviders';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';
import { useStakeMutation } from 'modules/stake-ankr/actions/stake';
import { ANKR_STAKE_FORM_ID } from 'modules/stake-ankr/const';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';

import { useProviderEffect } from '../../../../auth/common/hooks/useProviderEffect';
import { RoutesConfig } from '../../../RoutesConfig';

import { useAnalytics } from './useAnalytics';
import { useApprove } from './useApprove';

interface IUseAnkrStake {
  faqItems: IFAQItem[];
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
  quoteText: string;
  additionalText?: string;
  additionalTooltip?: string;
  additionalValue?: string;
  onSubmit: (values: IStakeSubmitPayload) => void;
  onChange?: (values: IStakeFormPayload, invalid: boolean) => void;
}

export const useAnkrStake = (): IUseAnkrStake => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  const [stake, { isLoading: isStakeLoading }] = useStakeMutation();

  const { setFormState, formState } =
    useFormState<IFormState>(ANKR_STAKE_FORM_ID);

  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });

  const { data: providers, isFetching: isProvidersLoading } =
    useGetProvidersQuery();

  const {
    data: commonData,
    isFetching: isCommonDataLoading,
    refetch: getCommonDataRefetch,
  } = useGetCommonDataQuery();

  const {
    data: totalInfo,
    isFetching: isTotalInfoLoading,
    refetch: getTotalInfoRefetch,
  } = useGetTotalInfoQuery();
  const amount = formState?.amount ?? ZERO;
  const balance = commonData?.ankrBalance ?? ZERO;

  const {
    isApproved,
    isLoading: isApproveLoading,
    handleApprove,
  } = useApprove();

  useProviderEffect(() => {
    dispatchRequest(getFAQ(Token.ANKR));
    getCommonDataRefetch();
    getTotalInfoRefetch();

    return () => {
      dispatch(resetRequests([getFAQ.toString()]));
    };
  }, [dispatch, dispatchRequest]);

  const currentProvider = providers ? providers[0] : null;
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const { sendAnalytics } = useAnalytics({
    amount,
    stakedAmount: totalInfo?.totalDelegatedAmount ?? ZERO,
    nodeProvider: initialProvider ?? '',
  });

  const lockingPeriod = commonData?.lockingPeriod ?? undefined;

  const onChange = ({ amount: formAmount }: IStakeFormPayload) => {
    const readyAmount = formAmount ? new BigNumber(formAmount) : undefined;
    dispatch(setFormState({ amount: readyAmount }));
  };

  const onSubmit = ({ provider, amount: formAmount }: IStakeSubmitPayload) => {
    const readyAmount = new BigNumber(formAmount);

    if (isApproved) {
      stake({
        provider,
        amount: readyAmount,
      })
        .unwrap()
        .catch(error => {
          if (!error) {
            sendAnalytics();
          }
        });
    } else {
      handleApprove(readyAmount);
    }
  };

  return {
    faqItems,
    isStakeLoading,
    isBalanceLoading: isCommonDataLoading,
    isApproveLoading,
    isApproved,
    isDisabled:
      isProvidersLoading ||
      isCommonDataLoading ||
      isStakeLoading ||
      isApproveLoading ||
      isTotalInfoLoading,
    balance,
    minStake: commonData?.minStake ?? ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerSelectHref: RoutesConfig.selectProvider.generatePath(),
    initialProvider,
    providerName,
    amount,
    initialAmount: amount.isNaN() ? undefined : amount.toFixed(),
    quoteText: t('stake-ankr.staking.fee-info'),
    additionalText: t('stake-ankr.staking.locking-period'),
    additionalTooltip: tHTML('stake-ankr.staking.locking-period-tooltip'),
    additionalValue: t('stake-ankr.staking.locking-period-value', {
      days: lockingPeriod,
    }),
    onChange,
    onSubmit,
  };
};
