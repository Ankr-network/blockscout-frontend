import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../api/MultiService';
import { Web3Address } from '../../common/types/provider';

interface IConnect {
  address: Web3Address;
  hasAccount: boolean;
  justDeposited: boolean;
}

export const connect = createSmartAction<RequestAction<IConnect, IConnect>>(
  'auth/connect',
  () => ({
    request: {
      promise: (async () => {
        const { provider, service } = MultiService.getInstance();
        await provider.connectFromInjected();
        const address = provider.currentAccount();
        service.initContractManager();
        const hasAccount = await await service.checkUserHaveDeposit(address);

        return { address, hasAccount, justDeposited: false } as IConnect;
      })(),
    },
    meta: {
      asMutation: false,
      getData: data => data,
    },
  }),
);
