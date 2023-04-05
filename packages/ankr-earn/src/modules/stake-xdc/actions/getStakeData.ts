import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { Web3KeyReadProvider, XDC } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { CacheTags, XDC_PROVIDER_ID } from '../const';

type TGetStakeData = IGetStakeData | null;

interface IGetStakeData {
  ankrXDCBalance: BigNumber;
  ankrXDCRatio: BigNumber;
  minStakeAmount: BigNumber;
  xdcBalance: BigNumber;
}

const { getAnkrXDCBalance, getAnkrXDCRatio, getMinStakeAmount, getXDCBalance } =
  XDC;

export const { useLazyGetStakeDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getStakeData: build.query<TGetStakeData, void>({
      queryFn: queryFnNotifyWrapper<void, never, TGetStakeData>(
        async (args, { getState }) => {
          const providerManager = getProviderManager();

          const { address, walletId } = selectEthProviderData(
            getState() as RootState,
          );

          if (!address || !walletId) {
            return {
              data: null,
            };
          }

          const provider = await providerManager.getProvider(
            XDC_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return {
              data: null,
            };
          }

          const [ankrXDCBalance, ankrXDCRatio, minStakeAmount, xdcBalance] =
            await Promise.all([
              getAnkrXDCBalance({
                address,
                provider,
              }),
              getAnkrXDCRatio({
                provider,
              }),
              getMinStakeAmount({
                provider,
              }),
              getXDCBalance({
                address,
                provider,
              }),
            ]);

          return {
            data: {
              ankrXDCBalance,
              ankrXDCRatio,
              minStakeAmount,
              xdcBalance,
            },
          };
        },
        error => getExtendedErrorText(error, t('stake-xdc.errors.stake-data')),
      ),
      providesTags: [CacheTags.stakeData],
    }),
  }),
});