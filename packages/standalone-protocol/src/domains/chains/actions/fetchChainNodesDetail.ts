import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { INodesDetailEntity } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { getStandaloneUrl, StandaloneType } from '../api/chain';

const getNodesDetail = () => {
  return MultiService.getService().getPublicGateway().getNodesDetail();
};

const getStandaloneNodesDetail = (chainId: StandaloneType) => {
  const url = getStandaloneUrl(chainId);

  return MultiService.getService()
    .getStandalonePublicGateway(url)
    .getNodesDetail();
};

export const fetchChainNodesDetail = createSmartAction<
  RequestAction<INodesDetailEntity[]>
>('chains/fetchChainNodesDetail', (chainId: string, isStandalone: boolean) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    requestKey: chainId,
    poll: 30,
    onRequest: () => {
      return {
        promise: (async (): Promise<INodesDetailEntity[]> => {
          const nodesDetail = isStandalone
            ? await getStandaloneNodesDetail(chainId as StandaloneType)
            : await getNodesDetail();

          const data = chainId
            ? nodesDetail.filter(item => chainId === item.id)
            : nodesDetail;

          return data;
        })(),
      };
    },
  },
}));
