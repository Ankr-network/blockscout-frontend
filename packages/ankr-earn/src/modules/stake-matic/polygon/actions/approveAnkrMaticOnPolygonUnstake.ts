import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { IApproveMutation } from 'modules/common/hooks/useApprove';

export const RECEIPT_NAME = 'useApproveAnkrMaticOnPolygonUnstakeMutation';

export const { useApproveAnkrMaticOnPolygonUnstakeMutation } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      approveAnkrMaticOnPolygonUnstake: build.mutation<
        IApproveMutation,
        BigNumber
      >({
        queryFn: queryFnNotifyWrapper<BigNumber, never, IApproveMutation>(
          async amount => {
            const sdk = await PolygonOnPolygonSDK.getInstance();
            const result = await sdk.approveACToken(amount);
            return { data: { ...result, amount } };
          },
          getOnErrorWithCustomText(
            t('stake-matic-common.errors.approve-unstake'),
          ),
        ),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          return queryFulfilled.then(response => {
            const { transactionHash } = response.data;
            const isNotApprovedYet = typeof transactionHash === 'string';

            if (isNotApprovedYet) {
              dispatch(
                getTxReceipt(transactionHash, {
                  requestKey: getTxReceiptRequestKey(RECEIPT_NAME),
                }),
              );
            }
          });
        },
      }),
    }),
  });
