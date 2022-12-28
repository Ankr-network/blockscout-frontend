import { Connection } from '@solana/web3.js';

import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { RPC_CALLS_CONFIG } from 'domains/requestComposer/utils/solana/RPCCallsConfig';
import { web3Api } from 'store/queries';

export const {
  endpoints: { chainsFetchSolanaLastBlockNumber },
  useChainsFetchSolanaLastBlockNumberQuery,
  useLazyChainsFetchSolanaLastBlockNumberQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchSolanaLastBlockNumber: build.query<number, string>({
      queryFn: async web3URL => {
        const web3Method = RPC_CALLS_CONFIG[SolanaMethod.getBlockHeight];

        const { exec } = web3Method[SolanaLibraryID.SolanaWeb3JS];

        const provider = new Connection(web3URL);

        const data: number = await exec(provider);

        return { data };
      },
    }),
  }),
});
