import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';
import { useParams } from 'react-router';

import { AvailableWriteProviders } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { SupportedChainIDS } from 'modules/common/const';
import { addEth2SwapTokenToWallet } from 'modules/eth2Swap/actions/wallet';
import { ISuccessPathParams, TSwapOption } from 'modules/eth2Swap/types';

import { TOKENS } from './const';

export interface IEth2SwapSuccessHookData {
  txHash: string;
  swapOption: TSwapOption;
  chainId: SupportedChainIDS;
  handleAddTokenToWallet: () => void;
}

export const useEth2SwapSuccessHook = (): IEth2SwapSuccessHookData => {
  const { txHash, swapOption } = useParams<ISuccessPathParams>();
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);
  const dispatchRequest = useDispatchRequest();

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addEth2SwapTokenToWallet({
        swapOption: TOKENS[swapOption],
        providerId: AvailableWriteProviders.ethCompatible,
      }),
    );
  }, [swapOption, dispatchRequest]);

  return {
    chainId: chainId as unknown as SupportedChainIDS,
    txHash,
    swapOption,
    handleAddTokenToWallet,
  };
};
