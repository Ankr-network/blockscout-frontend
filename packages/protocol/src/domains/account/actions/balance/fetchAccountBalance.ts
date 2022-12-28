import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { accountFetchAccountBalance },
  useAccountFetchAccountBalanceQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    accountFetchAccountBalance: build.query<BigNumber, void>({
      queryFn: async () => {
        const service = await MultiService.getWeb3Service();

        const data = await service
          .getContractService()
          .getCurrentAccountBalance();

        const keyProvider = service.getKeyProvider();

        const value = keyProvider.getWeb3().utils.fromWei(data);

        return { data: new BigNumber(value) };
      },
    }),
  }),
});
