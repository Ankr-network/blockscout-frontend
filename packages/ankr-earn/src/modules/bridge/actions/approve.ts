import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { SupportedChainIDS } from 'modules/common/const';
import { IApproveMutation } from 'modules/common/hooks/useApprove';

import { BridgeSDK } from '../api/BridgeSDK';
import { AvailableBridgeTokens } from '../types';

export const RECEIPT_NAME = 'useApproveBridgeMutation';

interface IBridgeApprovalArgs {
  amount: BigNumber;
  token: AvailableBridgeTokens;
  fromChainId: SupportedChainIDS;
}

export const {
  useApproveBridgeMutation,
  endpoints: { approveBridge },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    approveBridge: build.mutation<IApproveMutation, IBridgeApprovalArgs>({
      queryFn: queryFnNotifyWrapper<
        IBridgeApprovalArgs,
        never,
        IApproveMutation
      >(async ({ amount, token, fromChainId }) => {
        const sdk = await BridgeSDK.getInstance();

        const results = await sdk.approve(amount, token, fromChainId);
        return { data: { ...results, amount } };
      }, getOnErrorWithCustomText(t('stake-ankr.errors.approve'))),
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
