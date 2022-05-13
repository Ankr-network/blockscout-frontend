import { IDailyChargingParams, IDailyChargingReponse } from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchDailyCharging = createSmartAction<
  RequestAction<IDailyChargingParams, IDailyChargingReponse>
>('account/fetchDailyCharging', (params: IDailyChargingParams) => ({
  request: {
    promise: (async () => {
      const { service } = MultiService.getInstance();

      return service.getDailyCharging(params);
    })(),
  },
  meta: {
    cache: false,
    asMutation: false,
  },
}));
