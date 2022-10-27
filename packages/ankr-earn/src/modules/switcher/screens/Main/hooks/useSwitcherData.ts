import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO, ETH_SCALE_FACTOR } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getSwitcherData } from 'modules/switcher/actions/getSwitcherData';
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
  const { data, loading: isDataLoading } = useQuery({
    type: getSwitcherData,
  });

  const { chainId, isConnected } = useAuth(
    AvailableWriteProviders.ethCompatible,
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

    dispatchRequest(
      getSwitcherData({
        chainId: CHAIN_ID_BY_TOKEN[from as AvailableSwitcherToken],
        token: from,
      }),
    );
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
