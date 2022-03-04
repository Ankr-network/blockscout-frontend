import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { injectWeb3Modal } from '../../api/Web3ModalKeyProvider';
import { hasMetamask } from '../utils/hasMetamask';
import { withStore } from './withStore';

export const connectWeb3 = createSmartAction<RequestAction<void, void>>(
  'auth/injectWeb3Modal',
  () => ({
    request: {
      promise: async () => {
        const { service } = MultiService.getInstance();

        if (!hasMetamask()) {
          throw new Error('no metamask extension found');
        }

        await service.getKeyProvider().connect(await injectWeb3Modal());
      },
    },
    meta: {
      asMutation: false,
      onRequest: withStore,
    },
  }),
);
