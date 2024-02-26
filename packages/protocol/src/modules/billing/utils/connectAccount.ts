import { MultiService } from 'modules/api/MultiService';

import { isAbstractProvider } from './isAbstractProvider';

export interface IConnectAccountParams {
  onError?: (error: unknown) => void;
}

export const connectAccount = async ({
  onError,
}: IConnectAccountParams = {}) => {
  const service = MultiService.getWeb3Service();
  const provider = service.getKeyWriteProvider().getWeb3()?.currentProvider;

  if (isAbstractProvider(provider) && provider.request) {
    try {
      await provider.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });

      await service.getKeyWriteProvider().connect();
    } catch (error) {
      onError?.(error);
    }
  }
};
