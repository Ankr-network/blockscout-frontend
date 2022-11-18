import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import {
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';

import { XDC_PROVIDER_ID } from '../const';

type TGetStakeData = IGetStakeData | null;

interface IGetStakeData {
  xdcBalance: BigNumber;
}

const { getXDCBalance } = XDC;

export const { useLazyGetStakeDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getStakeData: build.query<TGetStakeData, void>({
      queryFn: queryFnNotifyWrapper<void, never, TGetStakeData>(
        async (args, { getState }) => {
          const providerManager = ProviderManagerSingleton.getInstance();

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

          const [xdcBalance] = await Promise.all([
            getXDCBalance({
              address,
              provider,
            }),
          ]);

          return {
            data: {
              xdcBalance,
            },
          };
        },
      ),
    }),
  }),
});
