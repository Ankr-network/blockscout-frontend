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
import { approve } from 'modules/stake-ankr/actions/approve';
import { getAnkrBalance } from 'modules/stake-ankr/actions/getAnkrBalance';
import { getProviders } from 'modules/stake-ankr/actions/getProviders';
import { stake } from 'modules/stake-ankr/actions/stake';
import { RoutesConfig } from 'modules/stake-ankr/Routes';

import { IAnkrStakeSubmitPayload } from '../components/AnkrStakeForm';

interface IUseAnkrStake {
  isStakeLoading: boolean;
  isBalanceLoading: boolean;
  isApproveLoading: boolean;
  isDisabled: boolean;
  isApproved: boolean;
  balance: BigNumber;
  tokenIn: string;
  closeHref: string;
  providerSelectHref: string;
  initialProvider?: string;
  providerName?: string;
  onSubmit: (values: IAnkrStakeSubmitPayload) => void;
}

export const useAnkrStake = (): IUseAnkrStake => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const { data: providers, loading: isProvidersLoading } = useQuery({
    type: getProviders,
  });

  const { data: ankrBalance, loading: isBalanceLoading } = useQuery({
    type: getAnkrBalance,
  });

  const { data: approveData, loading: isApproveLoading } = useQuery({
    type: approve,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });

  useProviderEffect(() => {
    dispatchRequest(getProviders());
    dispatchRequest(getAnkrBalance());

    return () => {
      dispatch(resetRequests([approve.toString()]));
    };
  }, []);

  const { provider: queryProvider } = RoutesConfig.stake.useParams();
  const currentProvider = providers?.find(p => p.validator === queryProvider);
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
    isBalanceLoading,
    isApproveLoading,
    isApproved,
    isDisabled:
      isProvidersLoading ||
      isBalanceLoading ||
      isStakeLoading ||
      isApproveLoading,
    balance: ankrBalance ?? ZERO,
    tokenIn: t('unit.ankr'),
    closeHref: RoutesConfig.main.generatePath(),
    providerSelectHref: RoutesConfig.selectProvider.generatePath(),
    initialProvider,
    providerName,
    onSubmit,
  };
};

// todo: refactor
function getDemoProviderName(addr?: string) {
  return addr ? 'Mind Heart Sou0l' : undefined;
}
