import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { push } from 'connected-react-router';

import { selectAccount } from 'domains/account/store/accountTopUpSlice';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { connect } from 'domains/auth/actions/connect';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { checkFirstTopUpStep } from './checkFirstTopUpStep';
// eslint-disable-next-line import/no-cycle
import { checkAllowanceStep } from './checkAllowanceStep';
import { checkTopUpStep } from './checkTopUpStep';
import { areHashesEmpty, isAmountEmpty } from './initialStepChecksUtils';
import { waitTransactionConfirming } from '../waitTransactionConfirming';

export const getInitialStep = createSmartAction<
  RequestAction<TopUpStep, TopUpStep>
>('topUp/getInitialStep', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<any> => {
          const service = await MultiService.getInstance();
          const provider = service.getKeyProvider();
          const { currentAccount: address } = provider;

          const stepForTheFirstTopUp = await checkFirstTopUpStep(
            address,
            store,
          );

          if (stepForTheFirstTopUp) return stepForTheFirstTopUp;

          const transaction = selectAccount(store.getState(), address);

          if (isAmountEmpty(transaction)) {
            store.dispatch(
              push(AccountRoutesConfig.accountDetails.generatePath()),
            );
          }

          if (areHashesEmpty(transaction)) return TopUpStep.start;

          const allowanceStep = await checkAllowanceStep(
            store,
            transaction?.rejectAllowanceTransactionHash,
            transaction?.allowanceTransactionHash,
          );

          if (allowanceStep) return allowanceStep;

          const topUpStep = await checkTopUpStep(
            store,
            transaction?.topUpTransactionHash,
          );

          if (topUpStep) return topUpStep;

          const { data: connectData } = getQuery(store.getState(), {
            type: connect.toString(),
            action: connect,
          });

          if (connectData?.credentials) {
            store.dispatchRequest(waitTransactionConfirming());

            return TopUpStep.waitTransactionConfirming;
          }

          return TopUpStep.login;
        })(),
      };
    },
  },
}));
