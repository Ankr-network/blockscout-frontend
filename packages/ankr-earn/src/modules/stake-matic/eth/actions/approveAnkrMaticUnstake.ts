import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { ETH_SCALE_FACTOR } from 'modules/common/const';
import { IApproveMutation } from 'modules/common/hooks/useApprove';

import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export const RECEIPT_NAME = 'useLazyApproveAnkrMaticUnstakeQuery';

export const {
  useApproveAnkrMaticUnstakeMutation,
  endpoints: { approveAnkrMaticUnstake },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    approveAnkrMaticUnstake: build.mutation<IApproveMutation, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, IApproveMutation>(
        async amount => {
          const sdk = await getPolygonOnEthereumSDK();

          const result = await sdk.approveMATICToken(amount, ETH_SCALE_FACTOR);

          return { data: { ...result, amount } };
        },
        error =>
          getExtendedErrorText(
            error,
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
