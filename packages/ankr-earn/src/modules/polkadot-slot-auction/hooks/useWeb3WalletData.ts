import { useQuery } from '@redux-requests/react';

import { ResponseData } from 'modules/common/types/ResponseData';

import { fetchWeb3WalletData } from '../actions/fetchWeb3WalletData';

type TUseWeb3WalletData = ResponseData<typeof fetchWeb3WalletData>;

export const useWeb3WalletData = (): TUseWeb3WalletData => {
  const { data } = useQuery<TUseWeb3WalletData>({
    action: fetchWeb3WalletData,
    defaultData: {
      chainId: 0,
      isConnected: false,
    } as TUseWeb3WalletData,
    type: fetchWeb3WalletData,
  });

  return data;
};
