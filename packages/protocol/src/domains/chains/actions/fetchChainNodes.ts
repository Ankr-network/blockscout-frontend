import { RequestAction } from '@redux-requests/core';
import { INodeEntity } from 'multirpc-sdk';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchChainNodes = createSmartAction<
  RequestAction<INodeEntity[], INodeEntity[]>
>('chains/fetchChainNodes', (blockchain: string) => ({
  request: {
    promise: (async () => {
      return MultiService.getPublicInstance().getNodes(blockchain);
    })(),
  },
  meta: {
    asMutation: false,
    takeLatest: false,
    getData: data => data,
  },
}));
