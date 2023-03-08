import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getPolygonOnEthereumSDK } from '../utils/getPolygonOnEthereumSDK';

export interface IStatsResponseData {
  maticBalance: BigNumber;
  aMATICbBalance: BigNumber;
  aMATICcBalance: BigNumber;
  pendingBond: BigNumber;
  pendingCertificate: BigNumber;
  aMATICcRatio: BigNumber;
}

export const { useGetMaticOnEthStatsQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getMaticOnEthStats: build.query<IStatsResponseData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IStatsResponseData>(
        async () => {
          const sdk = await getPolygonOnEthereumSDK();

          const [
            maticBalance,
            aMATICbBalance,
            aMATICcBalance,
            aMATICcRatio,
            { pendingBond, pendingCertificate },
          ] = await Promise.all([
            sdk.getMaticBalance(),
            sdk.getABBalance(),
            sdk.getACBalance(),
            sdk.getACRatio(),
            sdk.getPendingData(),
          ]);

          return {
            data: {
              maticBalance,
              aMATICbBalance,
              aMATICcBalance,
              pendingBond,
              pendingCertificate,
              aMATICcRatio,
            },
          };
        },
        error =>
          getExtendedErrorText(
            error,
            t('stake-matic-common.errors.common-data'),
          ),
      ),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
