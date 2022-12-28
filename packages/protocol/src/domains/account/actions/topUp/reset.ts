import { GetState } from 'store';
import { accountFetchPublicKey } from '../fetchPublicKey';
import { getEndpointName } from 'store/utils/getEndpointName';
import { resetEndpoints } from 'store/utils/resetEndpoints';
import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { topUpDeposit } from './deposit';
import { topUpFetchTransactionConfirmationStatus } from './fetchTransactionConfirmationStatus';
import { topUpGetInitialStep } from './getInitialStep/getInitialStep';
import { topUpGetLastLockedFundsEvent } from './getLastLockedFundsEvent';
import { topUpLogin } from './login';
import { topUpSendAllowance } from './sendAllowance';
import { topUpWaitTransactionConfirming } from './waitTransactionConfirming';
import { web3Api } from 'store/queries';

export const {
  endpoints: { topUpReset },
  useLazyTopUpResetQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpReset: build.query<null, void>({
      queryFn: (_arg, { dispatch, getState: untypedGetState }) => {
        const getState = untypedGetState as GetState;

        const endpoints = [
          getEndpointName(topUpGetInitialStep, getState),
          getEndpointName(topUpSendAllowance, getState),
          getEndpointName(accountFetchPublicKey, getState),
          getEndpointName(topUpDeposit, getState),
          getEndpointName(topUpWaitTransactionConfirming, getState),
          getEndpointName(topUpFetchTransactionConfirmationStatus, getState),
          getEndpointName(topUpLogin, getState),
          getEndpointName(topUpGetLastLockedFundsEvent, getState),
          getEndpointName(topUpCheckAllowanceTransaction, getState),
        ];

        resetEndpoints(endpoints, dispatch);

        return { data: null };
      },
    }),
  }),
});
