import BigNumber from 'bignumber.js';

import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

export const {
  endpoints: { accountFetchAccountBalance },
  useAccountFetchAccountBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchAccountBalance: build.query<BigNumber, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: async ({ web3Service }) => {
          const data = await web3Service
            .getContractService()
            .getCurrentAccountBalance();

          const keyProvider = web3Service.getKeyWriteProvider();

          const value = keyProvider.getWeb3().utils.fromWei(data);

          return { data: new BigNumber(value) };
        },
        fallback: { data: new BigNumber(0) },
      }),
    }),
  }),
});
