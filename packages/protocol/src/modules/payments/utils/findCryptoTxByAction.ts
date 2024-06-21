import { PayloadAction } from '@reduxjs/toolkit';

import { IPaymentsSlice, IUpdateCryptoTxPayload } from '../types';

export interface IFindCryptoTxByActionParams<
  Payload extends IUpdateCryptoTxPayload,
> {
  action: PayloadAction<Payload>;
  state: IPaymentsSlice;
}

export const findCryptoTxByAction = <Payload extends IUpdateCryptoTxPayload>({
  action,
  state,
}: IFindCryptoTxByActionParams<Payload>) =>
  state.cryptoTransactions.find(tx => tx.id === action.payload.id);
