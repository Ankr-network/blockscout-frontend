import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import {
  getTxReceipt,
  getTxReceiptRequestKey,
} from 'modules/common/actions/getTxReceipt';
import { IApproveMutation } from 'modules/common/hooks/useApprove';

import { getOnErrorWithCustomText } from '../../api/utils/getOnErrorWithCustomText';
import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';

export const RECEIPT_NAME = 'useApproveMNGOStakeMutation';

export const {
  useApproveMNGOStakeMutation,
  endpoints: { approveMNGOStake },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    approveMNGOStake: build.mutation<IApproveMutation, BigNumber>({
      queryFn: queryFnNotifyWrapper<BigNumber, never, IApproveMutation>(
        async amount => {
          const sdk = await GnosisStakingSDK.getInstance();
          const result = await sdk.approve(amount);
          return { data: { ...result, amount } };
        },
        getOnErrorWithCustomText(t('stake-mgno.errors.approve')),
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
