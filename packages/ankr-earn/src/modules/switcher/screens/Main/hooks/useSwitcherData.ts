import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useState } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getSwitcherData } from 'modules/switcher/actions/getSwitcherData';

export interface ISwitcherHookDataArgs {
  from: Token;
}

export interface ISwitcherHookData {
  chainId: number;
  hasApprove: boolean;
  isDataLoading: boolean;
  balance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
  aethBalance?: BigNumber;
  fethBalance?: BigNumber;
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
  const ratio = useMemo(() => data?.ratio ?? ONE_ETH, [data?.ratio]);
  const allowance = useMemo(() => data?.allowance ?? ZERO, [data?.allowance]);
  const balance =
    from === Token.aETHb ? data?.aETHbBalance : data?.aETHcBalance;
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
        providerId: AvailableWriteProviders.ethCompatible,
      }),
    );
  }, [dispatchRequest]);

  return {
    chainId: chainId as number,
    isDataLoading,
    hasApprove,
    ratio,
    allowance,
    balance: max,
    aethBalance: data?.aETHcBalance,
    fethBalance: data?.aETHbBalance,
  };
};
