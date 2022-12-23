import { RootState } from 'store';

import {
  getWeb3LatestBlockNumber,
  ITxEventsHistoryData,
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { XDC_PROVIDER_BY_ENV } from 'modules/common/const';

import { XDC_BLOCK_60_DAYS_OFFSET } from '../const';

export const { useLazyGetDashboardTxEventsHistoryQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getDashboardTxEventsHistory: build.query<ITxEventsHistoryData, void>({
        queryFn: queryFnNotifyWrapper<void, never, ITxEventsHistoryData>(
          async (args, { getState }) => {
            const defaultState: ITxEventsHistoryData = {
              completedBond: [],
              completedCertificate: [],
              pendingBond: [],
              pendingCertificate: [],
              unstakeBond: [],
              unstakeCertificate: [],
            };

            const providerManager = ProviderManagerSingleton.getInstance();

            const { address } = selectEthProviderData(getState() as RootState);

            if (!address) {
              return {
                data: {
                  ...defaultState,
                },
              };
            }

            const provider = await providerManager.getETHReadProvider(
              XDC_PROVIDER_BY_ENV,
            );

            if (!(provider instanceof Web3KeyReadProvider)) {
              return {
                data: {
                  ...defaultState,
                },
              };
            }

            const latestBlockNumber = await getWeb3LatestBlockNumber({
              provider,
            });

            const from = latestBlockNumber - XDC_BLOCK_60_DAYS_OFFSET;
            const to = latestBlockNumber;

            return {
              data: await XDC.getTxEventsHistoryRange({
                address,
                from,
                provider,
                to,
              }),
            };
          },
        ),
      }),
    }),
  });
