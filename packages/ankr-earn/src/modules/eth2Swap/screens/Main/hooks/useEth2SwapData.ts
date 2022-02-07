import { useMemo, useCallback, useState, useEffect } from 'react';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableProviders } from 'provider/providerManager/types';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { useAuth } from 'modules/auth/hooks/useAuth';
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
  fethBalance?: BigNumber;
  aethBalance?: BigNumber;
  handleChooseAEthB: () => void;
  handleChooseAEthC: () => void;
}

export const useEth2SwapData = (): IEth2SwapHookData => {
  const dispatchRequest = useDispatchRequest();
  const { data, loading: isDataLoading } = useQuery({
    type: getEth2SwapData,
  });
  const { chainId } = useAuth(AvailableProviders.ethCompatible);

  const [swapOption, setSwapOption] = useState<TSwapOption>('aETHb');
  const [hasApprove, setHasApprove] = useState(false);
  const balance =
    swapOption === 'aETHb' ? data?.fethBalance : data?.aethBalance;
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
    setSwapOption('aETHb');
  }, []);

  const handleChooseAEthC = useCallback(() => {
    setSwapOption('aETHc');
  }, []);

  useEffect(() => {
    dispatchRequest(
      getEth2SwapData({
        providerId: AvailableProviders.ethCompatible,
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
    aethBalance: data?.aethBalance,
    fethBalance: data?.fethBalance,
    handleChooseAEthB,
    handleChooseAEthC,
  };
};
