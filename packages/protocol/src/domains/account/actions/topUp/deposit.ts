import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { formatToWei } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { accountFetchPublicKey } from '../fetchPublicKey';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { setTopUpTransaction } from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';
import { GetState } from 'store';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

export const {
  endpoints: { topUpDeposit },
  useLazyTopUpDepositQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpDeposit: build.query<IWeb3SendResult, BigNumber>({
      queryFn: createNotifyingQueryFn(
        async (amount, { getState, dispatch }) => {
          const service = await MultiService.getWeb3Service();

          const address = await getCurrentTransactionAddress(
            getState as GetState,
          );

          const publicKey = await dispatch(
            accountFetchPublicKey.initiate(),
          ).unwrap();

          const depositResponse = await service
            .getContractService()
            .depositAnkrToPAYG(formatToWei(amount), publicKey);

          if (depositResponse.transactionHash) {
            dispatch(
              setTopUpTransaction({
                address,
                topUpTransactionHash: depositResponse.transactionHash,
              }),
            );
          }

          return { data: depositResponse };
        },
      ),
    }),
  }),
});
