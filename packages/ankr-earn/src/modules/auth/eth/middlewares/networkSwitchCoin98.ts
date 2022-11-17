import { EWalletId } from '@ankr.com/provider-core';
import { success } from '@redux-requests/core';
import { Middleware } from 'redux';

import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

/**
 * This is a temporary solution for the case when a user uses the staking app
 * with a Coin98 wallet. Since there is a network switching error in this wallet,
 * we decided to reload the window after a successful network change.
 *
 * It should be removed as soon as the network switching is done smoothly using
 * Coin98 wallet.
 */
export const networkSwitchCoin98: Middleware = store => next => action => {
  if (getIsSwitchActionSuccess(action)) {
    const isCoin98Wallet =
      selectEthProviderData(store.getState()).walletId === EWalletId.coin98;

    if (isCoin98Wallet) {
      window.location.reload();
    }
  }

  return next(action);
};

function getIsSwitchActionSuccess(action: { type: string }): boolean {
  if (action.type === success(switchNetwork.toString())) return true;
  return false;
}
