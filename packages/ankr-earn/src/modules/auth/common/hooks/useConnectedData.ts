import { useQuery } from '@redux-requests/react';

import { getIsSui } from 'modules/auth/sui/utils/getIsSui';

import { AvailableStakingWriteProviders } from '../../../common/types';
import { getIsInjectedWallet, getIsOKX } from '../../eth/utils/walletTypeUtils';
import { getIsPolkadot } from '../../polkadot/utils/getIsPolkadot';
import { connect, IConnect } from '../actions/connect';
import { TChainId } from '../types';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

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
  const { data, loading, error } = useQuery<IConnect | null>({
    type: connect,
    requestKey: getAuthRequestKey(providerId),
  });

  const walletName = data?.walletName;

  return {
    error,
    isConnected: !!data?.isConnected,
    address: data?.address,
    isLoading: loading,
    chainId: data?.chainId,
    walletName,
    walletIcon: data?.walletIcon,
    isInjected: walletName ? getIsInjectedWallet(walletName) : false,
    isOKX: walletName ? getIsOKX(walletName) : false,
    isPolkadot: walletName ? getIsPolkadot(walletName) : false,
    isSui: walletName ? getIsSui(walletName) : false,
    walletId: data?.walletId,
  };
};
