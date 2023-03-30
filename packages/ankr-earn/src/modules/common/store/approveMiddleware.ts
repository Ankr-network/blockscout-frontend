import { Middleware } from 'redux';

import { approveBridge } from 'modules/bridge/actions/approveBridge';
import { approveAnkr } from 'modules/stake-ankr/actions/approve';
import { approveABNBCForSwapPool } from 'modules/stake-bnb/actions/approveABNBCForSwapPool';
import { approveABNBCUnstake } from 'modules/stake-bnb/actions/approveABNBCUnstake';
import { approveAnkrMaticUnstake } from 'modules/stake-matic/eth/actions/approveAnkrMaticUnstake';
import { approveMaticOnEthStake } from 'modules/stake-matic/eth/actions/approveMaticOnEthStake';
import { approveAnkrMaticOnPolygonUnstake } from 'modules/stake-matic/polygon/actions/approveAnkrMaticOnPolygonUnstake';
import { approveMNGOStake } from 'modules/stake-mgno/actions/approveMNGOStake';

import { setAllowance } from './allowanceSlice';

const approveActions = [
  approveAnkr,
  approveABNBCForSwapPool,
  approveABNBCUnstake,
  approveAnkrMaticUnstake,
  approveMaticOnEthStake,
  approveAnkrMaticOnPolygonUnstake,
  approveMNGOStake,
];

export const approveMiddleware: Middleware = store => next => action => {
  const isBridgeApproveAction = approveBridge?.matchFulfilled(action);
  const isApproveAction = approveActions.some(approveAction =>
    approveAction?.matchFulfilled(action),
  );
  if (isBridgeApproveAction) {
    store.dispatch(setAllowance(action.meta.arg.originalArgs.amount));
  } else if (isApproveAction) {
    store.dispatch(setAllowance(action.meta.arg.originalArgs));
  }

  return next(action);
};
