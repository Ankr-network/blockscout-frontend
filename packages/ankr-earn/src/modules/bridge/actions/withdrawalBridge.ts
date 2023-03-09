import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';

import { BridgeSDK } from '../api/BridgeSDK';
import { WITHDRAWAL_ACTION_NAME } from '../const';

interface IWithdrawalArgs {
  proof: string;
  receipt: string;
  signature: string;
}

export const { useWithdrawalBridgeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    withdrawalBridge: build.mutation<string, IWithdrawalArgs>({
      queryFn: queryFnNotifyWrapper<IWithdrawalArgs, never, string>(
        async ({ proof, receipt, signature }) => {
          const sdk = await BridgeSDK.getInstance();

          const transactionHash = await sdk.withdraw(proof, receipt, signature);

          return { data: transactionHash };
        },
      ),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          dispatch(
            getTxReceipt(response.data, {
              requestKey: getTxReceiptRequestKey(WITHDRAWAL_ACTION_NAME),
            }),
          );
        });
      },
    }),
  }),
});
