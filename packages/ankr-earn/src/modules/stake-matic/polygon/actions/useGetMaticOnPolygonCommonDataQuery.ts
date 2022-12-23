import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';

export interface IGetCommonData {
  maticBalance: BigNumber;
  maticBondBalance: BigNumber;
  maticCertBalance: BigNumber;
  ratio: BigNumber;
}

export const { useGetMaticOnPolygonCommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnPolygonCommonData: build.query<IGetCommonData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetCommonData>(async () => {
        const sdk = await PolygonOnPolygonSDK.getInstance();

        const [maticBondBalance, maticCertBalance, maticBalance, ratio] =
          await Promise.all([
            sdk.getABBalance(),
            sdk.getACBalance(),
            sdk.getMaticBalance(),
            sdk.getACRatio(),
          ]);

        return {
          data: {
            maticBalance,
            maticBondBalance,
            maticCertBalance,
            ratio,
          },
        };
      }),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
