import {
  ICrowdloanType,
  TNetworkType,
} from '@ankr.com/stakefi-polkadot/dist/types/entity';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

type TFetchCrowdloanBalancesData = Record<number, IFetchCrowdloanBalancesItem>;

interface IContractCrowdloanBalancesItem {
  claimable: BigNumber;
  loanId: number;
  total: BigNumber;
}

export interface IFetchCrowdloanBalancesItem {
  total: BigNumber;
  claimable: BigNumber;
  rewardPoolSymbol: string;
  stakingTokenSymbol: string;
}

export const fetchCrowdloanBalances = createAction<
  RequestAction<TFetchCrowdloanBalancesData, TFetchCrowdloanBalancesData>
>(
  'FETCH_CROWDLOAN_BALANCES',
  (polkadotAccount: string): RequestAction => ({
    request: {
      promise: (async (): Promise<TFetchCrowdloanBalancesData> => {
        const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();

        const network: TNetworkType = await slotAuctionSdk
          .getPolkadotProvider()
          .getNetworkType();

        const [crowdloans, crowdloanBalances] = await Promise.all([
          slotAuctionSdk.getApiGateway().getCrowdloans({
            network,
          }),
          slotAuctionSdk.getCrowdloanBalances(polkadotAccount),
        ]);

        return crowdloans.reduce(
          (result, item: ICrowdloanType): TFetchCrowdloanBalancesData => {
            const currCrowdloanBalanceItem:
              | IContractCrowdloanBalancesItem
              | undefined = crowdloanBalances.find(
              ({ loanId }): boolean => item.loanId === loanId,
            );

            return {
              ...result,
              [item.loanId]: {
                total: new BigNumber(currCrowdloanBalanceItem?.total ?? 0),
                claimable: new BigNumber(
                  currCrowdloanBalanceItem?.claimable ?? 0,
                ),
                rewardPoolSymbol: item.bondTokenSymbol,
                stakingTokenSymbol: item.rewardTokenSymbol,
              },
            };
          },
          {},
        );
      })(),
    },
    meta: {
      asMutation: false,
    },
  }),
);
