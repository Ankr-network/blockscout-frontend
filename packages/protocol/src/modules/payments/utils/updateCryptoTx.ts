import { PayloadAction } from '@reduxjs/toolkit';

import { IPaymentsSlice, IUpdateCryptoTxPayload } from '../types';
import { findCryptoTxByAction } from './findCryptoTxByAction';

export interface IUpdateCryptoTxParams<Payload extends IUpdateCryptoTxPayload> {
  action: PayloadAction<Payload>;
  state: IPaymentsSlice;
}
export const updateCryptoTx = <Payload extends IUpdateCryptoTxPayload>({
  action,
  state,
}: IUpdateCryptoTxParams<Payload>) => {
  const tx = findCryptoTxByAction({ action, state });

  if (tx) {
    Object.assign(tx, action.payload);
  }
};
