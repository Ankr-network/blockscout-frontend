import { Middleware } from 'redux';

import { getBridgeAllowance } from 'modules/bridge/actions/lazyGetBridgeAllowance';
import { getAnkrAllowance } from 'modules/stake-ankr/actions/getAnkrAllowance';
import { getBNBAllowance } from 'modules/stake-bnb/actions/useLazyGetBNBAllowanceQuery';
import { getBNBSwapPoolAllowance } from 'modules/stake-bnb/actions/useLazyGetBNBSwapPoolAllowanceQuery';
import { getMaticOnEthAllowance } from 'modules/stake-matic/eth/actions/getMaticOnEthAllowance';
import { getMaticOnPolygonAllowance } from 'modules/stake-matic/polygon/actions/getMaticOnPolygonAllowance';
import { getMNGOAllowance } from 'modules/stake-mgno/actions/getMNGOAllowance';

import { setAllowance } from './allowanceSlice';

const allowanceActions = [
  getBridgeAllowance,
  getAnkrAllowance,
  getBNBAllowance,
  getBNBSwapPoolAllowance,
  getMaticOnEthAllowance,
  getMaticOnPolygonAllowance,
  getMNGOAllowance,
];

export const allowanceMiddleware: Middleware = store => next => action => {
  const isAllowanceAction = allowanceActions.some(allowanceAction =>
    allowanceAction?.matchFulfilled(action),
  );

  if (isAllowanceAction) {
    store.dispatch(setAllowance(action.payload));
  }

  return next(action);
};
