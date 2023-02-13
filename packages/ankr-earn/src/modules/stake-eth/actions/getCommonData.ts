import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { getOnErrorWithCustomText } from 'modules/api/utils/getOnErrorWithCustomText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ACTION_CACHE_SEC } from 'modules/common/const';

import { CacheTags } from '../const';
import { getEthereumSDK } from '../utils/getEthereumSDK';

export interface IGetCommonData {
  aETHbBalance: BigNumber;
  aETHcBalance: BigNumber;
  aETHcRatio: BigNumber;
  ethBalance: BigNumber;
}

export const { useGetETHCommonDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getETHCommonData: build.query<IGetCommonData, void>({
      queryFn: queryFnNotifyWrapper<void, never, IGetCommonData>(async () => {
        const sdk = await getEthereumSDK();

        const isFormatted = true;
        const [ethBalance, aETHbBalance, aETHcBalance, aETHcRatio] =
          await Promise.all([
            sdk.getEthBalance(),
            sdk.getABBalance(isFormatted),
            sdk.getACBalance(isFormatted),
            sdk.getACRatio(isFormatted),
          ]);

        return {
          data: {
            aETHbBalance,
            aETHcBalance,
            aETHcRatio,
            ethBalance,
          },
        };
      }, getOnErrorWithCustomText(t('stake-ethereum.errors.common-data'))),
      keepUnusedDataFor: ACTION_CACHE_SEC,
      providesTags: [CacheTags.common],
    }),
  }),
});
