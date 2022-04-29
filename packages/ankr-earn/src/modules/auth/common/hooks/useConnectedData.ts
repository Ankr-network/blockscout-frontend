import { useQuery } from '@redux-requests/react';

import { AvailableWriteProviders } from 'provider';

import { EEthereumNetworkId } from 'modules/common/types';

import { getIsMetaMask } from '../../eth/utils/getIsMetaMask';
import { getIsPolkadot } from '../../polkadot/utils/getIsPolkadot';
import { connect, IConnect } from '../actions/connect';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

export interface IUseConnectedData {
  isConnected: boolean;
  isLoading: boolean;
  address?: string;
  chainId?: EEthereumNetworkId;
  walletName?: string;
  walletIcon?: string;
  error: unknown;
  isMetaMask: boolean;
  isPolkadot: boolean;
}

export const useConnectedData = (
  providerId: AvailableWriteProviders,
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
    isMetaMask: walletName ? getIsMetaMask(walletName) : false,
    isPolkadot: walletName ? getIsPolkadot(walletName) : false,
  };
};
