import { GetState } from 'store';
import { getEndpointName } from 'store/utils/getEndpointName';
import { resetEndpoints } from 'store/utils/resetEndpoints';
import { web3Api } from 'store/queries';

import { accountFetchPublicKey } from '../fetchPublicKey';
import { topUpCheckAllowanceTransaction } from './checkAllowanceTransaction';
import { topUpDeposit } from './deposit';
import { topUpDepositUSDC } from './depositUSDC';
import { topUpDepositUSDT } from './depositUSDT';
import { topUpFetchTransactionConfirmationStatus } from './fetchTransactionConfirmationStatus';
import { topUpGetInitialStep } from './getInitialStep/getInitialStep';
import { topUpGetLastLockedFundsEvent } from './getLastLockedFundsEvent';
import { topUpLogin } from './login';
import { topUpSendAllowanceAnkr } from './sendAllowanceAnkr';
import { topUpSendAllowanceUsdt } from './sendAllowanceUsdt';
import { topUpWaitTransactionConfirming } from './waitTransactionConfirming';

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
          getEndpointName(topUpSendAllowanceAnkr, getState),
          getEndpointName(topUpSendAllowanceUsdt, getState),
          getEndpointName(accountFetchPublicKey, getState),
          getEndpointName(topUpDeposit, getState),
          getEndpointName(topUpDepositUSDC, getState),
          getEndpointName(topUpDepositUSDT, getState),
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
