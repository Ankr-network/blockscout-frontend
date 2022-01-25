import { useQuery } from '@redux-requests/react';
import { BlockchainNetworkId } from 'modules/common/types';
import { AvailableProviders } from 'provider/providerManager/types';
import { connect, IConnect } from '../actions/connect';
import { getAuthRequestKey } from '../utils/getAuthRequestKey';

export interface IUseConnectedData {
  isConnected: boolean;
  isLoading: boolean;
  address?: string;
  chainId?: BlockchainNetworkId;
  walletName?: string;
  walletIcon?: string;
}

export const useConnectedData = (
  providerId: AvailableProviders,
): IUseConnectedData => {
  const { data, loading } = useQuery<IConnect | null>({
    type: connect,
    requestKey: getAuthRequestKey(providerId),
  });

  return {
    isConnected: !!data?.isConnected,
    address: data?.address,
    isLoading: loading,
    chainId: data?.chainId,
    walletName: data?.walletName,
    walletIcon: data?.walletIcon,
  };
};
