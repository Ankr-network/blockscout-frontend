import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import {
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { ZERO } from 'modules/common/const';

import { CacheTags, XDC_PROVIDER_ID } from '../const';

interface IGetStakeGasFeeProps {
  amount: BigNumber;
}

export const { useLazyGetStakeGasFeeQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getStakeGasFee: build.query<BigNumber, IGetStakeGasFeeProps>({
      queryFn: queryFnNotifyWrapper<IGetStakeGasFeeProps, never, BigNumber>(
        async ({ amount }, { getState }) => {
          const providerManager = ProviderManagerSingleton.getInstance();

          const { address, walletId } = selectEthProviderData(
            getState() as RootState,
          );

          if (!address || !walletId) {
            return {
              data: ZERO,
            };
          }

          const provider = await providerManager.getProvider(
            XDC_PROVIDER_ID,
            walletId,
          );

          if (!(provider instanceof Web3KeyReadProvider)) {
            return {
              data: ZERO,
            };
          }

          return {
            data: await XDC.getStakeGasFee({
              address,
              amount,
              provider,
            }),
          };
        },
      ),
      providesTags: [CacheTags.stakeData],
    }),
  }),
});
