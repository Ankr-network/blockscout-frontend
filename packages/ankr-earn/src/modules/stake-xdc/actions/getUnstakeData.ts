import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { Web3KeyReadProvider, XDC } from '@ankr.com/staking-sdk';

import { getProviderManager } from 'modules/api/getProviderManager';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { CacheTags, XDC_PROVIDER_ID } from '../const';

type TGetUnstakeData = IGetUnstakeData | null;

interface IGetUnstakeData {
  ankrXDCBalance: BigNumber;
  ankrXDCRatio: BigNumber;
  xdcBalance: BigNumber;
  xdcPoolAmount: BigNumber;
}

const { getAnkrXDCBalance, getAnkrXDCRatio, getXDCBalance, getXDCPoolAmount } =
  XDC;

export const { useLazyGetUnstakeDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getUnstakeData: build.query<TGetUnstakeData, void>({
      queryFn: queryFnNotifyWrapper<void, never, TGetUnstakeData>(
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

          const [ankrXDCBalance, ankrXDCRatio, xdcBalance, xdcPoolAmount] =
            await Promise.all([
              getAnkrXDCBalance({
                address,
                provider,
              }),
              getAnkrXDCRatio({
                provider,
              }),
              getXDCBalance({
                address,
                provider,
              }),
              getXDCPoolAmount({
                provider,
              }),
            ]);

          return {
            data: {
              ankrXDCBalance,
              ankrXDCRatio,
              xdcBalance,
              xdcPoolAmount,
            },
          };
        },
      ),
      providesTags: [CacheTags.unstakeData],
    }),
  }),
});
