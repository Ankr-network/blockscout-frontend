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
import {
  IAnkrStakeFormPayload,
  IAnkrStakeSubmitPayload,
  IFormState,
} from 'modules/delegate-stake/components/StakeForm/const';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getTotalInfo } from 'modules/stake-ankr/actions/getTotalInfo';
import { stake } from 'modules/stake-ankr/actions/stake';
import { ANKR_STAKE_FORM_ID, TEMPORARY_APY } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { useFormState } from '../../../../forms/hooks/useFormState';

import { useAnalytics } from './useAnalytics';
import { useApprove } from './useApprove';

interface IUseAnkrStake {
  isStakeLoading: boolean;
  isBalanceLoading: boolean;
  isApproveLoading: boolean;
  isApyLoading: boolean;
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
  const { data: apyData, loading: isApyLoading } = useQuery({
    type: getAPY,
  });
  const { data: totalInfo, loading: isTotalInfoLoading } = useQuery({
    type: getTotalInfo,
  });

  const amount = formState?.amount ?? ZERO;
  const balance = commonData?.ankrBalance ?? ZERO;

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const {
    isApproved,
    isLoading: isApproveLoading,
    handleApprove,
  } = useApprove();

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getCommonData());
    dispatchRequest(getAPY());
    dispatchRequest(getTotalInfo());
  }, []);

  const currentProvider = providers ? providers[0] : null;
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);
  const apyItem = apyData?.find(x => x.validator === initialProvider);
  const apy = apyItem ? apyItem.apy : TEMPORARY_APY;

  const { sendAnalytics } = useAnalytics({
    amount,
    stakedAmount: totalInfo?.totalDelegatedAmount ?? ZERO,
    nodeProvider: initialProvider ?? '',
  });

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
      ).then(({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      });
    } else {
      handleApprove(readyAmount);
    }
  };

  return {
    isStakeLoading,
    isBalanceLoading: isCommonDataLoading,
    isApproveLoading,
    isApyLoading,
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
    apy,
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
