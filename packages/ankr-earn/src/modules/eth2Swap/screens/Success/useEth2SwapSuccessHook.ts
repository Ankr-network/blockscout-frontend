import { useCallback } from 'react';
import { useParams } from 'react-router';
import { useDispatchRequest } from '@redux-requests/react';

import { AvailableWriteProviders } from 'provider/providerManager/types';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { ISuccessPathParams, TSwapOption } from 'modules/eth2Swap/types';
import { addEth2SwapTokenToWallet } from 'modules/eth2Swap/actions/wallet';
import { SupportedChainIDS } from 'modules/common/const';

export interface IEth2SwapSuccessHookData {
  txHash: string;
  swapOption: TSwapOption;
  chainId: SupportedChainIDS;
  handleAddTokenToWallet: () => void;
}

export const useEth2SwapSuccessHook = () => {
  const { txHash, swapOption } = useParams<ISuccessPathParams>();
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);
  const dispatchRequest = useDispatchRequest();

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addEth2SwapTokenToWallet({
        swapOption,
        providerId: AvailableWriteProviders.ethCompatible,
      }),
    );
  }, [swapOption, dispatchRequest]);

  return {
    chainId,
    txHash,
    swapOption,
    handleAddTokenToWallet,
  };
};
