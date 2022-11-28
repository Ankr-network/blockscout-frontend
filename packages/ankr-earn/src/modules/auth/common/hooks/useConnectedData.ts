import { AvailableWriteProviders } from '@ankr.com/provider';

import { getIsSui } from 'modules/auth/sui/utils/getIsSui';
import { useAppSelector } from 'store/useAppSelector';

import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from '../../../common/types';
import { getIsInjectedWallet, getIsOKX } from '../../eth/utils/walletTypeUtils';
import { getIsPolkadot } from '../../polkadot/utils/getIsPolkadot';
import { useConnectMutation } from '../actions/connect';
import {
  selectEthProviderData,
  selectPolkadotProviderData,
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
  ] = useConnectMutation({
    fixedCacheKey: AvailableWriteProviders.ethCompatible,
  });

  const [
    ,
    {
      data: polkadotData,
      isLoading: isPolkadotConnectLoading,
      isError: isPolkadotConnectError,
    },
  ] = useConnectMutation({
    fixedCacheKey: ExtraWriteProviders.polkadotCompatible,
  });

  const ethProviderStatus = useAppSelector(selectEthProviderData);
  const polkadotProviderStatus = useAppSelector(selectPolkadotProviderData);

  const selectorData = isEthCompatible(providerId)
    ? ethProviderStatus
    : polkadotProviderStatus;

  const data = isEthCompatible(providerId) ? ethData : polkadotData;

  const walletName = data?.walletName;

  return {
    error: isEthCompatible(providerId)
      ? isEthConnectError
      : isPolkadotConnectError,
    isConnected: !!data?.isConnected,
    address: selectorData?.address,
    isLoading: isEthCompatible(providerId)
      ? isEthConnectLoading
      : isPolkadotConnectLoading,
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

function isEthCompatible(providerId: AvailableStakingWriteProviders): boolean {
  return providerId === AvailableWriteProviders.ethCompatible;
}
