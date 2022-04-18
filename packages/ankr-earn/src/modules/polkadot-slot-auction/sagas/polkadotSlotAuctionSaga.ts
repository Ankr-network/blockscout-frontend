import { Action } from 'redux';
import { ForkEffect, put, take, takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-smart-actions';

import { PolkadotProvider } from 'polkadot';

import {
  closeModalAction,
  DIALOG_POLKADOT_EXTENSION,
  OPEN_MODAL_ACTION,
  openModalAction,
} from 'store/dialogs/actions';

import { connect } from '../actions/connect';
import {
  isProviderAvailable,
  ProviderName,
} from '../utils/isProviderAvailable';

// Clean limitConcurrency queue if error
// Handle ethereum web3 error

export const initConnect = createAction('INIT_CONNECT_SLOT_AUCTION_SDK');

function* connectNotification() {
  if (isProviderAvailable(ProviderName.clover)) {
    yield put(connect());
    return;
  }

  if (isProviderAvailable(ProviderName.polkadot)) {
    yield put(
      openModalAction(DIALOG_POLKADOT_EXTENSION, {
        isCloverWalletAvailable: false,
        isPolkadotWalletAvailable: true,
      }),
    );

    const data: Action = yield take([OPEN_MODAL_ACTION, connect.toString()]);

    if (data.type === connect.toString()) {
      yield put(closeModalAction());
    }

    return;
  }

  if (!PolkadotProvider.isInjected()) {
    yield put(
      openModalAction(DIALOG_POLKADOT_EXTENSION, {
        isCloverWalletAvailable: false,
        isPolkadotWalletAvailable: false,
      }),
    );
  }
}

export function* polkadotSlotAuctionSaga(): Generator<ForkEffect, void> {
  yield takeEvery(initConnect.toString(), connectNotification);
}
