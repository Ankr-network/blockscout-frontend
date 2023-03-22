import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { store } from 'store';

import { Web3KeyReadProvider } from '@ankr.com/provider';
import { EthereumSSV } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { CacheTags } from 'modules/common/const';

import { SSV_PROVIDER_ID, SSVCacheTags } from '../const';

type TGetStakeData = IGetStakeData | null;

interface IGetStakeData {
  asETHcBalance: BigNumber;
  asETHcRatio: BigNumber;
  ethBalance: BigNumber;
  minStakeAmount: BigNumber;
}

const { getASETHCBalance, getASETHCRatio, getETHBalance, getMinStakeAmount } =
  EthereumSSV;

export const { useGetSSVStakeDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getSSVStakeData: build.query<TGetStakeData, void>({
      queryFn: queryFnNotifyWrapper<void, never, TGetStakeData>(
        async () => {
          const providerManager = getProviderManager();

          const { address, walletId } = selectEthProviderData(store.getState());

          if (!address || !walletId) {
            return { data: null };
          }

          const provider = await providerManager.getProvider(
            SSV_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return { data: null };
          }

          const [asETHcBalance, asETHcRatio, ethBalance, minStakeAmount] =
            await Promise.all([
              getASETHCBalance({
                address,
                provider,
              }),
              getASETHCRatio({
                provider,
              }),
              getETHBalance({
                address,
                provider,
              }),
              getMinStakeAmount({
                provider,
              }),
            ]);

          return {
            data: {
              asETHcBalance,
              asETHcRatio,
              ethBalance,
              minStakeAmount,
            },
          };
        },
        error =>
          getExtendedErrorText(error, t('stake-ssv.errors.get-stake-data')),
      ),
      providesTags: [CacheTags.account, SSVCacheTags.stakeData],
    }),
  }),
});
