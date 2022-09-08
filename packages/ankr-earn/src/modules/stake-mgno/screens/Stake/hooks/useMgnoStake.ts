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
import { useFormState } from 'modules/forms/hooks/useFormState';
import { getBalance } from 'modules/stake-mgno/actions/getBalance';
import { getMaxStakeAmount } from 'modules/stake-mgno/actions/getMaxStakeAmount';
import { getMinStakeAmount } from 'modules/stake-mgno/actions/getMinStakeAmount';
import { getProviderContributed } from 'modules/stake-mgno/actions/getProviderContributed';
import { getProviderStats } from 'modules/stake-mgno/actions/getProviderStats';
import { stake } from 'modules/stake-mgno/actions/stake';
import { TEST_PROVIDER_ID } from 'modules/stake-mgno/api/GnosisStakingSDK/const';
import { MGNO_STAKE_FORM_ID } from 'modules/stake-mgno/const';
import { RoutesConfig } from 'modules/stake-mgno/Routes';
import {
  IMgnoFormState,
  IMgnoStakeFormPayload,
  IMgnoStakeSubmitPayload,
} from 'modules/stake-mgno/types';

import { useApprove } from './useApprove';

interface IUseMgnoStake {
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

  const { data: balance, loading: isBalanceLoading } = useQuery({
    type: getBalance,
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

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { setFormState, formState } =
    useFormState<IMgnoFormState>(MGNO_STAKE_FORM_ID);

  const amount = formState?.amount;

  const initialProvider = TEST_PROVIDER_ID;
  const providerName = providerStats?.provider.name;

  const {
    isApproved,
    isLoading: isApproveLoading,
    handleApprove,
  } = useApprove();

  useProviderEffect(() => {
    dispatchRequest(getBalance());
    dispatchRequest(getMinStakeAmount());
    dispatchRequest(getProviderContributed({ provider: initialProvider }));
    dispatchRequest(getProviderStats({ provider: initialProvider }));
    dispatchRequest(getMaxStakeAmount({ provider: initialProvider }));

    return () => {
      dispatch(
        resetRequests([
          getBalance.toString(),
          getMinStakeAmount.toString(),
          getMaxStakeAmount.toString(),
        ]),
      );
    };
  }, [dispatchRequest]);

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
      );
    } else {
      handleApprove(readyAmount);
    }
  };

  return {
    isStakeLoading,
    isBalanceLoading:
      isBalanceLoading || isMinStakeLoading || isMaxStakeLoading,
    isApproveLoading,
    isApproved,
    isDisabled: false,
    balance: balance ?? ZERO,
    minStake: minStakeAmount ?? ZERO,
    maxAmount: maxStakeAmount ?? ZERO,
    tokenIn: t('unit.mgno'),
    closeHref: RoutesConfig.main.generatePath(),
    providerSelectHref: '', // RoutesConfig.selectProvider.generatePath(),
    initialProvider,
    providerName,
    amount: amount ?? ZERO,
    initialAmount: amount?.toFixed(),
    quoteText: tHTML('stake-mgno.staking.lock-info'),
    additionalText: t('stake-mgno.staking.slashing-protection'),
    additionalTooltip: t('stake-mgno.staking.slashing-protection-tooltip'),
    contributed: contributed ?? ZERO,
    onChange,
    onSubmit,
  };
};
