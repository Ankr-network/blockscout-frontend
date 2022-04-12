import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
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
  hasApprove: boolean;
  isDataLoading: boolean;
  balance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
  acBalance?: BigNumber;
  abBalance?: BigNumber;
}

export const useSwitcherData = ({
  from,
}: ISwitcherHookDataArgs): ISwitcherHookData => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading: isDataLoading } = useQuery({
    type: getSwitcherData,
  });

  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);

  const [hasApprove, setHasApprove] = useState(false);
  const ratio = useMemo(() => data?.ratio ?? new BigNumber(1), [data?.ratio]);
  const allowance = useMemo(() => data?.allowance ?? ZERO, [data?.allowance]);
  const isFromToken = useMemo(
    () => SWITCHER_FROM_TOKENS.includes(from),
    [from],
  );
  const balance = isFromToken ? data?.abBalance : data?.acBalance;
  const max = useMemo(() => balance ?? ZERO, [balance]);

  useProviderEffect(() => {
    if (hasApprove || !data?.allowance) {
      return;
    }

    setHasApprove(data.allowance.isZero());
  }, [hasApprove, data?.allowance]);

  useProviderEffect(() => {
    dispatchRequest(
      getSwitcherData({
        chainId: CHAIN_ID_BY_TOKEN[from as AvailableSwitcherToken],
      }),
    );
  }, [from, dispatchRequest]);

  return {
    chainId: chainId as AvailableSwitchNetwork,
    isDataLoading,
    hasApprove,
    ratio,
    allowance,
    balance: max,
    acBalance: data?.acBalance,
    abBalance: data?.abBalance,
  };
};
