import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO, ETH_SCALE_FACTOR, ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetSwitcherDataQuery } from 'modules/switcher/actions/getSwitcherData';
import {
  AvailableSwitcherToken,
  AvailableSwitchNetwork,
  CHAIN_ID_BY_TOKEN,
  SWITCHER_FROM_TOKENS,
} from 'modules/switcher/const';

export interface ISwitcherHookDataArgs {
  from: Token;
}

export interface ISwitcherHookData {
  chainId: AvailableSwitchNetwork;
  isDataLoading: boolean;
  balance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
  acBalance?: BigNumber;
  abBalance?: BigNumber;
  isConnected: boolean;
  checkAllowance: (amount: BigNumber) => boolean;
}

export const useSwitcherData = ({
  from,
}: ISwitcherHookDataArgs): ISwitcherHookData => {
  const dispatchRequest = useDispatchRequest();

  const { chainId, isConnected } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const {
    data,
    isFetching: isDataLoading,
    refetch: statsRefetch,
  } = useGetSwitcherDataQuery(
    {
      chainId: CHAIN_ID_BY_TOKEN[from as AvailableSwitcherToken],
      token: from as AvailableSwitcherToken,
    },
    {
      skip: !isConnected,
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    },
  );

  const ratio = useMemo(() => data?.ratio ?? new BigNumber(1), [data?.ratio]);
  const allowance = useMemo(() => data?.allowance ?? ZERO, [data?.allowance]);
  const isFromToken = useMemo(
    () => SWITCHER_FROM_TOKENS.includes(from),
    [from],
  );
  const balance = isFromToken ? data?.abBalance : data?.acBalance;
  const max = useMemo(() => balance ?? ZERO, [balance]);

  const checkAllowance = useCallback(
    (amount: BigNumber) => {
      const isSmallAllowance =
        allowance.isLessThan(amount.multipliedBy(ETH_SCALE_FACTOR)) ||
        allowance.isZero();

      return isSmallAllowance && !isFromToken;
    },
    [isFromToken, allowance],
  );

  useProviderEffect(() => {
    if (!isConnected) return;
    statsRefetch();
  }, [from, dispatchRequest]);

  return {
    chainId: chainId as AvailableSwitchNetwork,
    isDataLoading,
    ratio,
    allowance,
    balance: max,
    acBalance: data?.acBalance,
    abBalance: data?.abBalance,
    isConnected,
    checkAllowance,
  };
};
