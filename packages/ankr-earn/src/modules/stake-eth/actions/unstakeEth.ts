import { sleep, t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { push } from 'connected-react-router';
import { PromiEvent, TransactionReceipt } from 'web3-core';

import { IWeb3SendResult } from '@ankr.com/provider';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';

import { CacheTags } from '../const';
import { RoutesConfig } from '../Routes';
import { TEthSyntToken } from '../types';

interface IUnstakeArgs {
  amount: BigNumber;
  token: TEthSyntToken;
}

export const { useUnstakeEthMutation } = web3Api.injectEndpoints({
  endpoints: build => ({
    unstakeEth: build.mutation<IWeb3SendResult, IUnstakeArgs>({
      queryFn: queryFnNotifyWrapper<IUnstakeArgs, never, IWeb3SendResult>(
        async () => {
          // todo: add actual unstake logic
          await sleep(3000);

          const demoData: IWeb3SendResult = {
            transactionHash:
              '0xc81930b71c447df89e0e07df035b063991f2fb9aba375491ba5328c7143f005e',
            receiptPromise: null as unknown as PromiEvent<TransactionReceipt>,
          };

          return { data: demoData };
        },
        error =>
          getExtendedErrorText(error, t('stake-ethereum.errors.unstake')),
      ),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        return queryFulfilled.then(response => {
          const { transactionHash } = response.data;

          if (transactionHash) {
            const { token, amount } = args;

            const path = RoutesConfig.unstakeSteps.generatePath({
              txHash: transactionHash,
              token,
              amount: amount.toString(),
            });

            dispatch(push(path));
          }
        });
      },
      invalidatesTags: [CacheTags.common],
    }),
  }),
});
