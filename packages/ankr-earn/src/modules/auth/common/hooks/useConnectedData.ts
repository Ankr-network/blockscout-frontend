import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectEthCompatibleMutation } from 'modules/auth/eth/actions/connectEthCompatible';
import { useConnectPolkadotMutation } from 'modules/auth/polkadot/actions/connectPolkadot';
import { getIsSui } from 'modules/auth/sui/utils/getIsSui';
import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from 'modules/common/types';
import { useAppSelector } from 'store/useAppSelector';

import { getIsInjectedWallet, getIsOKX } from '../../eth/utils/walletTypeUtils';
import { getIsPolkadot } from '../../polkadot/utils/getIsPolkadot';
import { useConnectSuiMutation } from '../../sui/actions/connectSui';
import {
  selectEthProviderData,
  selectPolkadotProviderData,
  selectSuiProviderData,
} from '../store/authSlice';
import { TChainId } from '../types';

export interface IUseConnectedData {
  isConnected: boolean;
  isLoading: boolean;
  address?: string;
  chainId?: TChainId;
  walletName?: string;
  walletIcon?: string;
  error: unknown;
  isInjected: boolean;
  isOKX: boolean;
  isPolkadot: boolean;
  isSui: boolean;
  walletId?: string;
}

export const useConnectedData = (
  providerId: AvailableStakingWriteProviders,
): IUseConnectedData => {
  const [
    ,
    {
      data: ethData,
      isLoading: isEthConnectLoading,
      isError: isEthConnectError,
    },
  ] = useConnectEthCompatibleMutation({
    fixedCacheKey: AvailableWriteProviders.ethCompatible,
  });

  const [
    ,
    {
      data: polkadotData,
      isLoading: isPolkadotConnectLoading,
      isError: isPolkadotConnectError,
    },
  ] = useConnectPolkadotMutation({
    fixedCacheKey: ExtraWriteProviders.polkadotCompatible,
  });

  const [
    ,
    {
      data: suiData,
      isLoading: isSuiConnectLoading,
      isError: isSuiConnectError,
    },
  ] = useConnectSuiMutation({
    fixedCacheKey: ExtraWriteProviders.suiCompatible,
  });

  const ethProviderStatus = useAppSelector(selectEthProviderData);
  const polkadotProviderStatus = useAppSelector(selectPolkadotProviderData);
  const suiProviderStatus = useAppSelector(selectSuiProviderData);

  let selectorData;
  let data;
  let isLoading = false;
  let error;

  switch (providerId) {
    case AvailableWriteProviders.ethCompatible:
      selectorData = ethProviderStatus;
      data = ethData;
      isLoading = isEthConnectLoading;
      error = isEthConnectError;
      break;
    case ExtraWriteProviders.polkadotCompatible:
      selectorData = polkadotProviderStatus;
      data = polkadotData;
      isLoading = isPolkadotConnectLoading;
      error = isPolkadotConnectError;
      break;
    case ExtraWriteProviders.suiCompatible:
      selectorData = suiProviderStatus;
      data = suiData;
      isLoading = isSuiConnectLoading;
      error = isSuiConnectError;
      break;
    default:
      break;
  }
  const walletName = data?.walletName;

  return {
    error,
    isConnected: !!data?.isConnected,
    address: selectorData?.address,
    isLoading,
    chainId: selectorData?.chainId,
    walletName,
    walletIcon: data?.walletIcon,
    isInjected: walletName ? getIsInjectedWallet(walletName) : false,
    isOKX: walletName ? getIsOKX(walletName) : false,
    isPolkadot: walletName ? getIsPolkadot(walletName) : false,
    isSui: walletName ? getIsSui(walletName) : false,
    walletId: data?.walletId,
  };
};
