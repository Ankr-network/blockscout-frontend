import { INodeEntity as IApiNodeEntity } from '@ankr.com/multirpc';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from '../../../modules/api/MultiService';
import { getChainIcon } from '../../../uiKit/utils/getTokenIcon';

interface INodeEntity extends IApiNodeEntity {
  icon: string;
}

function getData(data: IApiNodeEntity[]): INodeEntity[] {
  return data.map(item => ({
    ...item,
    icon: getChainIcon(item.blockchain),
  }));
}

export const fetchNodeProviders = createSmartAction<
  RequestAction<IApiNodeEntity[], INodeEntity[]>
>('nodeProviders/fetchNodeProviders', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      return service.getWorkerGateway().apiGetNodes();
    })(),
  },
  meta: {
    cache: false,
    asMutation: false,
    getData,
  },
}));
