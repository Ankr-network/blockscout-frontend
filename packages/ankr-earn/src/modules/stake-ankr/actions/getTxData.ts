import retry from 'async-retry';
import BigNumber from 'bignumber.js';

import { web3Api } from 'modules/api/web3Api';
import { Milliseconds } from 'modules/common/types';
import { queryFnNotifyWrapper } from 'modules/common/utils/queryFnNotifyWrapper';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';

const POLL_INTERVAL: Milliseconds = 10_000;

export interface IGetTxData {
  amount?: BigNumber;
  isPending: boolean;
  destinationAddress?: string;
  provider: string;
}

interface IGetTxDataProps {
  txHash: string;
}

export const { useGetTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTxData: build.query<IGetTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, IGetTxData>(
        async ({ txHash }) => {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();

          return {
            data: await retry(
              async () => {
                return sdk.fetchTxData(txHash, await provider.getBlockNumber());
              },
              {
                factor: 1,
                minTimeout: POLL_INTERVAL,
                retries: 5,
              },
            ),
          };
        },
      ),
    }),
  }),
});
