import { INodeEntity as IApiNodeEntity } from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';

interface INodeEntity extends IApiNodeEntity {
  icon: string;
}

function getData(data: IApiNodeEntity[]): INodeEntity[] {
  return data.map(item => ({
    ...item,
    blockchain: item.blockchain === 'eth' ? 'Ethereum' : item.blockchain,
    icon: getChainIcon(item.blockchain),
  }));
}

export const fetchNodeProviders = createSmartAction<
  RequestAction<IApiNodeEntity[], INodeEntity[]>
>('nodeProviders/fetchNodeProviders', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      return service.getWorkerGateway().getNodes();
    })(),
  },
  meta: {
    cache: false,
    asMutation: false,
    getData,
  },
}));
