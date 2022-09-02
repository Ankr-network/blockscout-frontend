import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { IProviderStats } from '../api/GnosisStakingSDK/types';
import { MGNO_ACTIONS_PREFIX } from '../const';
import { getProviderStatsUrl } from '../utils/getProviderStatsUrl';

interface IProviderStatsArgs {
  provider: string;
}

export const getProviderStats = createAction<
  RequestAction<IProviderStats, IProviderStats>,
  [IProviderStatsArgs]
>(
  `${MGNO_ACTIONS_PREFIX}getProviderStats`,
  ({ provider }): RequestAction => ({
    request: { url: getProviderStatsUrl(provider) },
    meta: {
      driver: 'axios',
      showNotificationOnError: true,
    },
  }),
);
