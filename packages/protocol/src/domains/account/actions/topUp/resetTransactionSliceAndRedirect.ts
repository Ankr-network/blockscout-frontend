import { RequestsStore } from '@redux-requests/core';
import { push } from 'connected-react-router';

import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { AccountRoutesConfig } from 'domains/account/Routes';

export const resetTransactionSliceAndRedirect = async (
  store: RequestsStore,
  address: string,
) => {
  store.dispatch(resetTransaction({ address }));

  store.dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
};
