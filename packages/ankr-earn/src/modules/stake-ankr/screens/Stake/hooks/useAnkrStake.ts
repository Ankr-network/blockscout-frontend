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
  minStake: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerSelectHref: string;
  initialProvider?: string;
  providerName?: string;
  lockingPeriod?: Days;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
}

export const useAnkrStake = (): IUseAnkrStake => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

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

    return () => {
      dispatch(resetRequests([approve.toString()]));
    };
  }, []);

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(
    provider => provider.validator === queryProvider,
  );
  const initialProvider = currentProvider?.validator;
  const providerName = getDemoProviderName(initialProvider);

  const isApproved = !!approveData;

  const onSubmit = ({ provider, amount }: IAnkrStakeSubmitPayload) => {
    const readyAmount = new BigNumber(amount);

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
    onSubmit,
  };
};
