import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
  IGetTxReceipt,
} from 'modules/common/actions/getTxReceipt';
import { SupportedChainIDS } from 'modules/common/const';

import { BridgeSDK } from '../api/BridgeSDK';
import { DEPOSIT_ACTION_NAME } from '../const';
import { AvailableBridgeTokens } from '../types';
import { getTokenAddr } from '../utils/getTokenAddr';

export interface IDepositArgs {
  amount: BigNumber;
  token: AvailableBridgeTokens;
  fromChainId: SupportedChainIDS;
  toChainId: SupportedChainIDS;
  onSuccess?: (response: { data: IGetTxReceipt | null }) => void;
}

export const { useBridgeDepositMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    bridgeDeposit: build.mutation<string, IDepositArgs>({
      queryFn: queryFnNotifyWrapper<IDepositArgs, never, string>(
        async ({ amount, token, fromChainId, toChainId }) => {
          const sdk = await BridgeSDK.getInstance();
          const fromToken = getTokenAddr(token, fromChainId);

          return { data: await sdk.deposit(amount, fromToken, toChainId) };
        },
      ),
      async onQueryStarted({ onSuccess }, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          dispatch(
            getTxReceipt(response.data, {
              requestKey: getTxReceiptRequestKey(DEPOSIT_ACTION_NAME),
              onSuccess,
            }),
          );
        });
      },
    }),
  }),
});
