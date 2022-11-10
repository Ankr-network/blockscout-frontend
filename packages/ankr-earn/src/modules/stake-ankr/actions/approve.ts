import BigNumber from 'bignumber.js';

import { web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IApproveResponse } from '../api/AnkrStakingSDK/types';

export const RECEIPT_NAME = 'useStakeMutation';

export const { useApproveMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    approve: build.mutation<IApproveResponse, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, IApproveResponse>(
        async amount => {
          const sdk = await AnkrStakingSDK.getInstance();

          return { data: await sdk.approve(amount) };
        },
      ),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { txHash } = response.data;
          const isNotApprovedYet = typeof txHash === 'string';

          if (isNotApprovedYet) {
            dispatch(
              getTxReceipt(txHash, {
                requestKey: getTxReceiptRequestKey(RECEIPT_NAME),
              }),
            );
          }
        });
      },
    }),
  }),
});
