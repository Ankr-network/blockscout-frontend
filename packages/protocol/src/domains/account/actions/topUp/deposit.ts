import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';

import { MultiService } from 'modules/api/MultiService';
import { accountFetchPublicKey } from '../fetchPublicKey';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import {
  setAllowanceTransaction,
  setTopUpTransaction,
} from 'domains/account/store/accountTopUpSlice';
import { web3Api } from 'store/queries';

export const {
  endpoints: { topUpDeposit },
  useLazyTopUpDepositQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpDeposit: build.query<IWeb3SendResult, BigNumber>({
      queryFn: createNotifyingQueryFn(async (amount, { dispatch }) => {
        const service = await MultiService.getWeb3Service();
        const provider = service.getKeyProvider();
        const { currentAccount: address } = provider;

        const publicKey = await dispatch(
          accountFetchPublicKey.initiate(),
        ).unwrap();

        const depositResponse = await service
          .getContractService()
          .depositAnkrToPAYG(amount, publicKey);

        dispatch(setAllowanceTransaction({ address }));

        if (depositResponse.transactionHash) {
          dispatch(
            setTopUpTransaction({
              address,
              topUpTransactionHash: depositResponse.transactionHash,
            }),
          );
        }

        return { data: depositResponse };
      }),
    }),
  }),
});
