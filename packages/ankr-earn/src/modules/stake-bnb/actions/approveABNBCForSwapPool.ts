import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { ETH_SCALE_FACTOR } from 'modules/common/const';
import { IApproveMutation } from 'modules/common/hooks/useApprove';

import { getOnErrorWithCustomText } from '../../api/utils/getOnErrorWithCustomText';
import { getBinanceSDK } from '../utils/getBinanceSDK';

export const RECEIPT_NAME = 'useApproveABNBCForSwapPoolMutation';

export const { useApproveABNBCForSwapPoolMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    approveABNBCForSwapPool: build.mutation<IApproveMutation, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, IApproveMutation>(
        async amount => {
          const sdk = await getBinanceSDK();

          const data = await sdk.approveACTokenForSwapPool(
            amount,
            ETH_SCALE_FACTOR,
          );
          return { data: { ...data, amount } };
        },
        getOnErrorWithCustomText(t('stake-bnb.errors.approve-swap')),
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
