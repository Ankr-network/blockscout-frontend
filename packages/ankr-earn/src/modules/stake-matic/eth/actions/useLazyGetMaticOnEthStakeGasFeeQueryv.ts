import BigNumber from 'bignumber.js';

import { PolygonOnEthereumSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

interface IGetStakeGasFeeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const { useLazyGetMaticOnEthStakeGasFeeQuery } = web3Api.injectEndpoints(
  {
    endpoints: build => ({
      getMaticOnEthStakeGasFee: build.query<BigNumber, IGetStakeGasFeeProps>({
        queryFn: queryFnNotifyWrapper<IGetStakeGasFeeProps, never, BigNumber>(
          async ({ amount, token }) => {
            const sdk = await PolygonOnEthereumSDK.getInstance();

            return { data: await sdk.getStakeGasFee(amount, token) };
          },
        ),
      }),
    }),
  },
);
