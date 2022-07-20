import { RequestsStore, resetRequests } from '@redux-requests/core';
import { push } from 'connected-react-router';

import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
// eslint-disable-next-line import/no-cycle
import { reset } from '../reset';
import { checkAllowanceTransaction } from '../checkAllowanceTransaction';

export const checkAllowanceStep = async (
  store: RequestsStore,
  rejectAllowanceTransactionHash?: string,
  allowanceTransactionHash?: string,
) => {
  const service = await MultiService.getInstance();
  const provider = service.getKeyProvider();
  const { currentAccount: address } = provider;

  if (rejectAllowanceTransactionHash) {
    store
      .dispatchRequest(
        checkAllowanceTransaction(rejectAllowanceTransactionHash),
      )
      .then(() => {
        store.dispatch(resetTransaction({ address }));
        store.dispatchRequest(reset());

        store.dispatch(push(AccountRoutesConfig.accountDetails.generatePath()));
      });

    return TopUpStep.deposit;
  }

  if (!allowanceTransactionHash) return null;

  store
    .dispatchRequest(checkAllowanceTransaction(allowanceTransactionHash))
    .then(() => {
      store.dispatch(resetRequests([checkAllowanceTransaction.toString()]));
    });

  return TopUpStep.deposit;
};
