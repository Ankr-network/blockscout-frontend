import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { PolygonOnPolygonSDK } from '@ankr.com/staking-sdk';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';
import { getPolygonOnEthereumSDK } from 'modules/stake-matic/eth/utils/getPolygonOnEthereumSDK';
import { CacheTags } from 'modules/stake-matic/polygon/const';

interface IGetNetworkChooserData {
  maticEthBalance: BigNumber;
  maticPolygonBalance: BigNumber;
}

export const { useGetNetworkChooserDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getNetworkChooserData: build.query<IGetNetworkChooserData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetNetworkChooserData>(
        async () => {
          const [ethSDK, polygonSDK] = await Promise.all([
            getPolygonOnEthereumSDK(),
            PolygonOnPolygonSDK.getInstance(),
          ]);

          const [maticEthBalance, maticPolygonBalance] = await Promise.all([
            ethSDK.getMaticBalance(),
            polygonSDK.getMaticBalance(),
          ]);

          return {
            data: {
              maticEthBalance,
              maticPolygonBalance,
            },
          };
        },
        getOnErrorWithCustomText(
          t('stake-matic-common.errors.network-chooser'),
        ),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
