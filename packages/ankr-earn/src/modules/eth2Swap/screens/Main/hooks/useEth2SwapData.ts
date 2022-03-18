import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo, useCallback, useState, useEffect } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getEth2SwapData } from 'modules/eth2Swap/actions/getEth2SwapData';
import { TSwapOption } from 'modules/eth2Swap/types';

export interface IEth2SwapHookData {
  chainId: number;
  swapOption: TSwapOption;
  hasApprove: boolean;
  isDataLoading: boolean;
  balance: BigNumber;
  ratio: BigNumber;
  allowance: BigNumber;
  aethBalance?: BigNumber;
  fethBalance?: BigNumber;
  handleChooseAEthB: () => void;
  handleChooseAEthC: () => void;
}

export const useEth2SwapData = (): IEth2SwapHookData => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading: isDataLoading } = useQuery({
    type: getEth2SwapData,
  });
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);

  const [swapOption, setSwapOption] = useState<TSwapOption>(Token.aETHb);
  const [hasApprove, setHasApprove] = useState(false);
  const balance =
    swapOption === Token.aETHb ? data?.aETHbBalance : data?.aETHcBalance;
  const ratio = useMemo(() => data?.ratio ?? ONE_ETH, [data?.ratio]);
  const allowance = useMemo(() => data?.allowance ?? ZERO, [data?.allowance]);
  const max = useMemo(() => balance ?? ZERO, [balance]);

  useEffect(() => {
    if (hasApprove || !data?.allowance) {
      return;
    }

    setHasApprove(data.allowance.isZero());
  }, [hasApprove, data?.allowance]);

  const handleChooseAEthB = useCallback(() => {
    setSwapOption(Token.aETHb);
  }, []);

  const handleChooseAEthC = useCallback(() => {
    setSwapOption(Token.aETHc);
  }, []);

  useProviderEffect(() => {
    dispatchRequest(
      getEth2SwapData({
        providerId: AvailableWriteProviders.ethCompatible,
      }),
    );
  }, [dispatchRequest]);

  return {
    chainId: chainId as number,
    isDataLoading,
    swapOption,
    hasApprove,
    ratio,
    allowance,
    balance: max,
    aethBalance: data?.aETHcBalance,
    fethBalance: data?.aETHbBalance,
    handleChooseAEthB,
    handleChooseAEthC,
  };
};
