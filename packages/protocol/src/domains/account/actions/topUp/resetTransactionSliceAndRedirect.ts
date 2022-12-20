import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { resetTransaction } from 'domains/account/store/accountTopUpSlice';

export const resetTransactionSliceAndRedirect = async (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  address: string,
) => {
  dispatch(resetTransaction({ address }));

  dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
};
