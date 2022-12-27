import Web3 from 'web3';

import { web3Api } from 'store/queries';

export const {
  endpoints: { chainsFetchLastBlockNumber },
  useLazyChainsFetchLastBlockNumberQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchLastBlockNumber: build.query<number, string>({
      queryFn: async web3URL => {
        const data = await new Web3(web3URL).eth.getBlockNumber();

        return { data };
      },
    }),
  }),
});
