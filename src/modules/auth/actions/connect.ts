import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../api/MultiService';
import { Web3Address } from '../../common/types/provider';
import { injectWeb3Modal } from '../../api/Web3ModalKeyProvider';
import { IJwtToken } from '@ankr.com/multirpc/dist/types/types';

interface IConnect {
  address: Web3Address;
  justDeposited: boolean;
  credentials?: IJwtToken;
}

export const connect = createSmartAction<RequestAction<IConnect, IConnect>>(
  'auth/connect',
  () => ({
    request: {
      promise: (async () => {
        const { service } = MultiService.getInstance();
        await service.getKeyProvider().connect(await injectWeb3Modal());
        const address = service.getKeyProvider().currentAccount();
        const hasAccount = await service.checkUserHaveDeposit(address);

        return {
          address,
          justDeposited: false,
          credentials: hasAccount
            ? await service.loginAsUser(address)
            : undefined,
        } as IConnect;
      })(),
    },
    meta: {
      asMutation: false,
      getData: data => data,
    },
  }),
);
