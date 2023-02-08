import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { IApproveMutation } from 'modules/common/hooks/useApprove';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const RECEIPT_NAME = 'useApproveMaticOnEthStakeMutation';

export const { useApproveMaticOnEthStakeMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveMaticOnEthStake: build.mutation<IApproveMutation, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, IApproveMutation>(
        async amount => {
          const sdk = await getPolygonOnEthereumSDK();
          const result = await sdk.approveMATICToken(amount);
          return { data: { ...result, amount } };
        },
        getOnErrorWithCustomText(t('stake-matic-common.errors.approve-stake')),
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
