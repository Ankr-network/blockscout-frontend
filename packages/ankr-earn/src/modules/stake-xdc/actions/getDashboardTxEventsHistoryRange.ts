import { RootState } from 'store';

import {
  ProviderManagerSingleton,
  Web3KeyReadProvider,
  XDC,
  getWeb3LatestBlockNumber,
} from '@ankr.com/staking-sdk';

import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { selectEthProviderData } from 'modules/auth/common/store/authSlice';
import { IBaseHistoryData } from 'modules/common/components/HistoryDialog/types';
import { XDC_PROVIDER_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { XDC_BLOCK_14_DAYS_OFFSET } from '../const';

interface IProps {
  step: number; // 1 step === 2 weeks
}

interface IData {
  [Token.ankrXDC]: IBaseHistoryData;
}

export const { useLazyGetDashboardTxEventsHistoryRangeQuery } =
  web3Api.injectEndpoints({
    endpoints: build => ({
      getDashboardTxEventsHistoryRange: build.query<IData, IProps>({
        queryFn: queryFnNotifyWrapper<IProps, never, IData>(
          async ({ step }, { getState }) => {
            const defaultState: IData = {
              [Token.ankrXDC]: {
                stakeEvents: [],
                unstakeEvents: [],
              },
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

            const from =
              latestBlockNumber - XDC_BLOCK_14_DAYS_OFFSET * (step + 1);
            const to = latestBlockNumber - XDC_BLOCK_14_DAYS_OFFSET * step;

            const historyData = await XDC.getTxEventsHistoryRange({
              address,
              from,
              provider,
              to,
            });

            return {
              data: {
                [Token.ankrXDC]: {
                  stakeEvents: historyData.completedCertificate,
                  unstakeEvents: historyData.unstakeCertificate,
                },
              },
            };
          },
        ),
      }),
    }),
  });
