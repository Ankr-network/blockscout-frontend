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
import { approve } from 'modules/stake-ankr/actions/approve';
import { getAPY } from 'modules/stake-ankr/actions/getAPY';
import { getCommonData } from 'modules/stake-ankr/actions/getCommonData';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { getValidatorDelegatedAmount } from 'modules/stake-ankr/actions/getValidatorDelegatedAmount';
import { stake } from 'modules/stake-ankr/actions/stake';
import { TEMPORARY_APY } from 'modules/stake-ankr/const';
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
  newTotalStake?: BigNumber;
  tokenIn: string;
  closeHref: string;
  minStake: BigNumber;
  providerId: string;
  providerName: string;
  amount: BigNumber;
  apy: BigNumber;
  lockingPeriod?: Days;
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
  const { data: delegatedAmount, loading: isDelegatedAmountLoading } = useQuery(
    {
      type: getValidatorDelegatedAmount,
    },
  );
  const { data: apyData } = useQuery({
    type: getAPY,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  const { provider: queryProvider } = RoutesConfig.stakeMore.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);
  const apyItem = apyData?.find(x => x.validator === initialProvider);
  const apy = apyItem ? apyItem.apy : TEMPORARY_APY;

  const isApproved = !!approveData;

  const stakedAmount = delegatedAmount ?? ZERO;

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getValidatorDelegatedAmount({ validator: queryProvider }));
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
    if (isError) return stakedAmount;
    return stakedAmount.plus(amount);
  }, [amount, stakedAmount, isError]);

  return {
    isStakeLoading,
    isBalanceLoading: isCommonDataLoading,
    isApproveLoading,
    isApproved,
    balance: commonData?.ankrBalance ?? ZERO,
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
