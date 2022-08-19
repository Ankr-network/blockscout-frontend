import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { TxHash } from 'modules/common/types';

import { MGNO_ACTIONS_PREFIX } from '../const';

interface IStakeArgs {
  amount: BigNumber;
  provider: string;
}

export const stake = createSmartAction<
  RequestAction<TxHash, TxHash>,
  [IStakeArgs]
>(
  `${MGNO_ACTIONS_PREFIX}stake`,
  ({ amount, provider }): RequestAction => ({
    request: {
      promise: (async (): Promise<TxHash> => {
        // todo: change it! temporary shit
        return amount.toFormat() + provider;
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
    },
  }),
);
