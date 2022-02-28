import { useQuery } from '@redux-requests/react';

import { AvailableWriteProviders } from 'provider';

import { BlockchainNetworkId } from 'modules/common/types';

import { connect, IConnect } from '../actions/connect';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

export interface IUseConnectedData {
  isConnected: boolean;
  isLoading: boolean;
  address?: string;
  chainId?: BlockchainNetworkId;
  walletName?: string;
  walletIcon?: string;
  error: unknown;
}

export const useConnectedData = (
  providerId: AvailableWriteProviders,
): IUseConnectedData => {
  const { data, loading, error } = useQuery<IConnect | null>({
    type: connect,
    requestKey: getAuthRequestKey(providerId),
  });

  return {
    error,
    isConnected: !!data?.isConnected,
    address: data?.address,
    isLoading: loading,
    chainId: data?.chainId,
    walletName: data?.walletName,
    walletIcon: data?.walletIcon,
  };
};
