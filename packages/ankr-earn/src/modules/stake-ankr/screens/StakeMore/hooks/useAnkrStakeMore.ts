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
import { Days } from 'modules/common/types';
import {
  IAnkrStakeFormPayload,
  IAnkrStakeSubmitPayload,
} from 'modules/delegate-stake/components/StakeForm/const';
import { approve } from 'modules/stake-ankr/actions/approve';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getProviderDelegatedAmount } from 'modules/stake-ankr/actions/getValidatorDelegatedAmount';
import { stake } from 'modules/stake-ankr/actions/stake';
import { TEMPORARY_APY } from 'modules/stake-ankr/const';
import { RoutesConfig } from 'modules/stake-ankr/Routes';
import { getDemoProviderName } from 'modules/stake-ankr/utils/getDemoProviderName';

import { useAnalytics } from './useAnalytics';

interface IUseAnkrStake {
  isStakeLoading: boolean;
  isBalanceLoading: boolean;
  isApproveLoading: boolean;
  isDisabled: boolean;
  isApproved: boolean;
  balance: BigNumber;
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
  minStake: BigNumber;
  providerId: string;
  providerName: string;
  amount: BigNumber;
  apy: BigNumber;
  lockingPeriod?: Days;
  onSubmit: (payload: IAnkrStakeSubmitPayload) => void;
  onChange?: (values: IAnkrStakeFormPayload, invalid: boolean) => void;
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
  const { data: delegatedAmount, loading: isDelegatedAmountLoading } = useQuery(
    {
      type: getProviderDelegatedAmount,
    },
  );
  const { data: apyData } = useQuery({
    type: getAPY,
  });

  const balance = commonData?.ankrBalance ?? ZERO;

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;

  const { sendAnalytics } = useAnalytics({
    amount,
    balance,
    nodeProvider: initialProvider ?? '',
  });

  const providerName = getDemoProviderName(initialProvider);
  const apyItem = apyData?.find(x => x.validator === initialProvider);
  const apy = apyItem ? apyItem.apy : TEMPORARY_APY;

  const isApproved = !!approveData;

  const stakedAmount = delegatedAmount ?? ZERO;

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getProviderDelegatedAmount({ validator: queryProvider }));
    dispatchRequest(getCommonData());
    dispatchRequest(getAPY());
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
      ).then(({ error }) => {
        if (!error) {
          sendAnalytics();
        }
      });
    } else {
      dispatchRequest(approve(readyAmount));
    }
  };

  const onChange = (
    { amount: formAmount }: IAnkrStakeFormPayload,
    invalid: boolean,
  ) => {
    const readyAmount = new BigNumber(formAmount ?? 0);
    setAmount(formAmount ? readyAmount : ZERO);
    setIsError(invalid);
  };

  const newTotalStake = useMemo(() => {
    if (isError) return stakedAmount;
    return stakedAmount.plus(amount);
  }, [amount, stakedAmount, isError]);

  return {
    isStakeLoading,
    isBalanceLoading: isCommonDataLoading,
    isApproveLoading,
    isApproved,
    balance,
    isDisabled:
      isCommonDataLoading ||
      isStakeLoading ||
      isApproveLoading ||
      isDelegatedAmountLoading,
    newTotalStake,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerId: initialProvider ?? '',
    providerName: providerName ?? '',
    minStake: commonData?.minStake ?? ZERO,
    amount,
    apy,
    lockingPeriod: commonData?.lockingPeriod ?? undefined,
    onChange,
    onSubmit,
  };
};
