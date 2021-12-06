import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IWorkerUserLocation } from '@ankr.com/multirpc';

import { MultiService } from 'modules/api/MultiService';

export const fetchUserLocation = createSmartAction<
  RequestAction<IWorkerUserLocation, string>
>('chains/fetchUserLocation', () => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      const userLocation = await service.getUserLocation();

      return userLocation?.country || '';
    })(),
  },
  meta: {
    cache: true,
    asMutation: false,
  },
}));
