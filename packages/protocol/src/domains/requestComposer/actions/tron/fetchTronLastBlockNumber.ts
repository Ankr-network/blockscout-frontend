import axios from 'axios';

import { TronNodeUrl } from 'domains/requestComposer/utils/tron/tronJSConfig';
import { web3Api } from 'store/queries';

interface IBlockInfo {
  blockID: string;
  block_header: {
    raw_data: {
      number: number;
    };
    witness_signature: string;
  };
}

export const {
  endpoints: { chainsFetchTronLastBlockNumber },
  useChainsFetchTronLastBlockNumberQuery,
  useLazyChainsFetchTronLastBlockNumberQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchTronLastBlockNumber: build.query<number, string>({
      queryFn: async web3URL => {
        const api = axios.create();

        const { data } = await api.get<IBlockInfo>(
          `${web3URL}${TronNodeUrl.FullNode}getnowblock`,
        );

        return { data: data.block_header.raw_data.number };
      },
    }),
  }),
});
