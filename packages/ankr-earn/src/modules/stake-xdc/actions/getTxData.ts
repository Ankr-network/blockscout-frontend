import retry from 'async-retry';
import { RootState } from 'store';

import {
  IFetchTxData,
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { RETRIES_TO_GET_TX_DATA } from 'modules/common/const';

import { XDC_PROVIDER_ID } from '../const';

type TGetTxData = IFetchTxData | null;

interface IGetTxDataProps {
  isUnstake?: boolean;
  txHash: string;
}

export const { useGetTxDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getTxData: build.query<TGetTxData, IGetTxDataProps>({
      queryFn: queryFnNotifyWrapper<IGetTxDataProps, never, TGetTxData>(
        async ({ isUnstake, txHash }, { getState }) => {
          const providerManager = ProviderManagerSingleton.getInstance();

          const { walletId } = selectEthProviderData(getState() as RootState);

          if (!walletId) {
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

          return {
            data: await retry(
              () =>
                XDC.getTxData({
                  isUnstake,
                  provider,
                  txHash,
                }),
              {
                retries: RETRIES_TO_GET_TX_DATA,
              },
            ),
          };
        },
      ),
    }),
  }),
});
