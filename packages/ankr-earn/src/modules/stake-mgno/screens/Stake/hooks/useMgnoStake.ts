import { resetRequests } from '@redux-requests/core';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useDispatch } from 'react-redux';

import { t, tHTML } from 'common';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useFormState } from 'modules/forms/hooks/useFormState';
import { getBalance } from 'modules/stake-mgno/actions/getBalance';
import { getMaxStakeAmount } from 'modules/stake-mgno/actions/getMaxStakeAmount';
import { getMinStakeAmount } from 'modules/stake-mgno/actions/getMinStakeAmount';
import { getProviderContributed } from 'modules/stake-mgno/actions/getProviderContributed';
import { getProviders } from 'modules/stake-mgno/actions/getProviders';
import { getProviderStats } from 'modules/stake-mgno/actions/getProviderStats';
import { getTotalInfo } from 'modules/stake-mgno/actions/getTotalInfo';
import { stake } from 'modules/stake-mgno/actions/stake';
import { DEFAULT_PROVIDER_ID } from 'modules/stake-mgno/api/GnosisStakingSDK/const';
import { MGNO_STAKE_FORM_ID } from 'modules/stake-mgno/const';
import { RoutesConfig } from 'modules/stake-mgno/Routes';
import {
  IMgnoFormState,
  IMgnoStakeFormPayload,
  IMgnoStakeSubmitPayload,
} from 'modules/stake-mgno/types';
import { getFAQ, IFAQItem } from 'modules/stake/actions/getFAQ';

import { useAnalytics } from './useAnalytics';
import { useApprove } from './useApprove';

interface IUseMgnoStake {
  faqItems: IFAQItem[];
  isStakeLoading: boolean;
  isBalanceLoading: boolean;
  isApproveLoading: boolean;
  isDisabled: boolean;
  isApproved: boolean;
  balance: BigNumber;
  minStake: BigNumber;
  maxAmount: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerSelectHref: string;
  initialProvider: string;
  initialAmount?: string;
  providerName?: string;
  amount: BigNumber;
  quoteText: string;
  additionalText?: string;
  additionalTooltip?: string;
  contributed: BigNumber;
  onSubmit: (values: IMgnoStakeSubmitPayload) => void;
  onChange?: (values: IMgnoStakeFormPayload, invalid: boolean) => void;
}

export const useMgnoStake = (): IUseMgnoStake => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { data: balanceData, loading: isBalanceLoading } = useQuery({
    type: getBalance,
  });
  const { data: faqItems } = useQuery<IFAQItem[]>({
    defaultData: [],
    type: getFAQ,
  });
  const { data: minStakeAmount, loading: isMinStakeLoading } = useQuery({
    type: getMinStakeAmount,
  });
  const { data: maxStakeAmount, loading: isMaxStakeLoading } = useQuery({
    type: getMaxStakeAmount,
  });
  const { data: contributed } = useQuery({
    type: getProviderContributed,
  });
  const { data: providerStats } = useQuery({
    type: getProviderStats,
  });
  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });
  const { data: totalInfo, loading: isTotalInfoLoading } = useQuery({
    type: getTotalInfo,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { setFormState, formState } =
    useFormState<IMgnoFormState>(MGNO_STAKE_FORM_ID);

  const amount = formState?.amount ?? ZERO;

  const currentProvider = providers ? providers[0] : null;
  const initialProvider = currentProvider?.provider ?? DEFAULT_PROVIDER_ID;
  const providerName = providerStats?.provider.name;

  const {
    isApproved,
    isLoading: isApproveLoading,
    handleApprove,
  } = useApprove();

  useProviderEffect(() => {
    dispatchRequest(getBalance());
    dispatchRequest(getFAQ(Token.mGNO));
    dispatchRequest(getMaxStakeAmount({ provider: initialProvider }));
    dispatchRequest(getMinStakeAmount());
    dispatchRequest(getProviderContributed({ provider: initialProvider }));
    dispatchRequest(getProviderStats({ provider: initialProvider }));
    dispatchRequest(getProviders());
    dispatchRequest(getTotalInfo());

    return () => {
      dispatch(
        resetRequests([
          getBalance.toString(),
          getFAQ.toString(),
          getMaxStakeAmount.toString(),
          getMinStakeAmount.toString(),
        ]),
      );
    };
  }, [dispatch, dispatchRequest, initialProvider]);

  const { sendAnalytics } = useAnalytics({
    amount,
    stakedAmount: totalInfo?.myTotalDelegatedAmount ?? ZERO,
    nodeProvider: initialProvider ?? '',
  });

  const onChange = ({ amount: formAmount }: IMgnoStakeFormPayload) => {
    const readyAmount = formAmount ? new BigNumber(formAmount) : undefined;
    dispatch(setFormState({ amount: readyAmount }));
  };

  const onSubmit = ({
    provider,
    amount: formAmount,
  }: IMgnoStakeSubmitPayload) => {
    const readyAmount = new BigNumber(formAmount);

    if (isApproved) {
      dispatchRequest(
        stake({
          provider,
          amount: readyAmount,
        }),
      ).then(({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      });
    } else {
      handleApprove(readyAmount);
    }
  };

  const balance = balanceData ?? ZERO;
  const maxAmount = maxStakeAmount ?? ZERO;

  return {
    faqItems,
    isStakeLoading,
    isBalanceLoading:
      isBalanceLoading || isMinStakeLoading || isMaxStakeLoading,
    isApproveLoading,
    isApproved,
    isDisabled:
      isBalanceLoading ||
      isMinStakeLoading ||
      isMaxStakeLoading ||
      isApproveLoading ||
      isStakeLoading ||
      isProvidersLoading ||
      isTotalInfoLoading,
    balance,
    minStake: minStakeAmount ?? ZERO,
    maxAmount: maxAmount.isGreaterThan(balance) ? balance : maxAmount,
    tokenIn: t('unit.mgno'),
    closeHref: RoutesConfig.main.generatePath(),
    providerSelectHref: '', // RoutesConfig.selectProvider.generatePath(),
    initialProvider,
    providerName,
    amount: amount ?? ZERO,
    initialAmount: amount.isNaN() ? undefined : amount.toFixed(),
    quoteText: tHTML('stake-mgno.staking.lock-info'),
    additionalText: t('stake-mgno.staking.slashing-protection'),
    additionalTooltip: t('stake-mgno.staking.slashing-protection-tooltip'),
    contributed: contributed ?? ZERO,
    onChange,
    onSubmit,
  };
};
