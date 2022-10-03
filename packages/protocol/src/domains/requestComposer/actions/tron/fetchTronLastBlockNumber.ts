import { RequestAction } from '@redux-requests/core';
import { TronNodeUrl } from 'domains/requestComposer/utils/tron/tronJSConfig';
import { createAction } from 'redux-smart-actions';

interface IBlockInfo {
  blockID: string;
  block_header: {
    raw_data: {
      number: number;
    };
    witness_signature: string;
  };
}

export const fetchTronLastBlockNumber = createAction<
  RequestAction<IBlockInfo, number>
>('chains/fetchTronLastBlockNumber', (web3URL: string) => ({
  request: {
    url: `${web3URL}${TronNodeUrl.FullNode}getnowblock`,
  },
  meta: {
    poll: 30,
    hideNotificationOnError: true,
    driver: 'axios',
    getData: (data: IBlockInfo) => {
      const result = data.block_header.raw_data.number;
      return result;
    },
  },
}));
