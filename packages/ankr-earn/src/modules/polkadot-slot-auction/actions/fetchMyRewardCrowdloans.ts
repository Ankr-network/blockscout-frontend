import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ICrowdloanType, SlotAuctionSdk } from 'polkadot';

import { TStore } from 'modules/common/types/ReduxRequests';
import { NotificationActions } from 'store/actions/NotificationActions';
import { IStoreState } from 'store/store';

import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';
import { setErrorMsg } from '../utils/setError';

type TFetchMyRewardCrowdloansData = Array<IFetchMyRewardCrowdloansItem | void>;

export interface IFetchMyRewardCrowdloansItem
  extends Omit<
    ICrowdloanType,
    'endLease' | 'endTime' | 'startLease' | 'startTime'
  > {
  claimableRewardsAmount: BigNumber;
  currBalance: BigNumber;
  endLease: Date;
  endTime: Date;
  startLease: Date;
  startTime: Date;
}

interface IClaimableStakingRewardsItem {
  amount: BigNumber;
  loanId: number;
}

interface IRewardPoolBalancesItem {
  balance: BigNumber;
  loanId: number;
}

const SKIPPED_ERROR_MSG = 'Web3 must be injected';

export const fetchMyRewardCrowdloans = createAction<
  RequestAction<TFetchMyRewardCrowdloansData, TFetchMyRewardCrowdloansData>
>(
  'polkadotSlotAuction/fetchMyRewardCrowdloans',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<TFetchMyRewardCrowdloansData> => {
        const slotAuctionSdk: SlotAuctionSdk =
          await SlotAuctionSdkSingleton.getInstance();

        let ethAddress: string;

        try {
          ethAddress = await slotAuctionSdk.getEthereumAccount();
        } catch (e) {
          throw new Error((e as Error)?.message ?? e);
        }

        const [
          rawSucceededData,
          rawClaimableStakingRewards,
          rawRewardPoolBalances,
        ] = await Promise.all([
          slotAuctionSdk.getCrowdloansByStatus('SUCCEEDED'),
          slotAuctionSdk.getClaimableStakingRewards(),
          slotAuctionSdk.getRewardPoolBalances(ethAddress),
        ]);

        const rawResultData: TFetchMyRewardCrowdloansData =
          rawSucceededData.reduce(
            (
              acc: TFetchMyRewardCrowdloansData,
              curr: ICrowdloanType,
            ): TFetchMyRewardCrowdloansData => {
              const currClaimableStakingRewards:
                | IClaimableStakingRewardsItem
                | undefined = rawClaimableStakingRewards.find(
                ({ loanId }: IClaimableStakingRewardsItem): boolean =>
                  loanId === curr.loanId,
              );
              const currRewardPoolBalances:
                | IRewardPoolBalancesItem
                | undefined = rawRewardPoolBalances.find(
                ({ loanId }: IRewardPoolBalancesItem): boolean =>
                  loanId === curr.loanId,
              );

              return [
                ...acc,
                {
                  ...curr,
                  claimableRewardsAmount:
                    currClaimableStakingRewards?.amount ?? new BigNumber(0),
                  currBalance:
                    currRewardPoolBalances?.balance ?? new BigNumber(0),
                  endLease: new Date(curr.endLease * 1_000),
                  endTime: new Date(curr.endTime * 1_000),
                  startLease: new Date(curr.startLease * 1_000),
                  startTime: new Date(curr.startTime * 1_000),
                },
              ];
            },
            [],
          );

        (rawResultData as IFetchMyRewardCrowdloansItem[]).sort((a, b) => {
          if (
            a.claimableRewardsAmount.isGreaterThan(0) &&
            b.claimableRewardsAmount.isGreaterThan(0)
          ) {
            return 0;
          }

          if (
            a.claimableRewardsAmount.isGreaterThan(0) &&
            !b.claimableRewardsAmount.isGreaterThan(0)
          ) {
            return -1;
          }

          if (
            !a.claimableRewardsAmount.isGreaterThan(0) &&
            b.claimableRewardsAmount.isGreaterThan(0)
          ) {
            return 1;
          }

          return 0;
        });

        return rawResultData;
      })(),
    },
    meta: {
      asMutation: false,
      onError: (
        error: Error,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): Error => {
        const { message: currMsg } = error;

        error.message = currMsg.includes('Error: ')
          ? currMsg
          : `Error: ${currMsg}`;

        error.message = setErrorMsg(error.message);

        if (!error.message.includes(SKIPPED_ERROR_MSG)) {
          store.dispatch(
            NotificationActions.showNotification({
              message: error.message,
              severity: 'error',
            }),
          );
        }

        throw error;
      },
    },
  }),
);
