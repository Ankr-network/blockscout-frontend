import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import { IApproveResponse } from '../api/AnkrStakingSDK/types';

export const RECEIPT_NAME = 'useApproveAnkrMutation';

export const { useApproveAnkrMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveAnkr: build.mutation<IApproveResponse, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, IApproveResponse>(
        async amount => {
          const sdk = await AnkrStakingSDK.getInstance();

          return { data: await sdk.approve(amount) };
        },
        getOnErrorWithCustomText(t('stake-ankr.errors.approve')),
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
