import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';

interface IGetStakeGasFeeProps {
  amount: BigNumber;
  token: TMaticSyntToken;
}

export const { useLazyGetMaticOnPolygonStakeGasFeeQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getMaticOnPolygonStakeGasFee: build.query<
        BigNumber,
        IGetStakeGasFeeProps
      >({
        queryFn: queryFnNotifyWrapper<IGetStakeGasFeeProps, never, BigNumber>(
          async ({ amount, token }) => {
            const sdk = await PolygonOnPolygonSDK.getInstance();

            return { data: await sdk.getStakeGasFee(amount, token) };
          },
        ),
      }),
    }),
  });
