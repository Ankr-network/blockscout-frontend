import { RequestAction } from '@redux-requests/core';
import { TStore } from 'modules/common/types/ReduxRequests';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store/store';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';
import { fetchMyRewardCrowdloans } from './fetchMyRewardCrowdloans';

interface IClaimStakingRewardsData {
  transactionHash: string;
  transactionReceipt: any;
}

interface IReq {
  data: IClaimStakingRewardsData;
}

export const claimStakingRewards = createAction<
  RequestAction<IClaimStakingRewardsData, IClaimStakingRewardsData>
>(
  'CLAIM_STAKING_REWARDS',
  (polkadotAccount: string, loanId: number): RequestAction => ({
    request: {
      promise: (async (): Promise<IClaimStakingRewardsData> => {
        const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();

        let data: IClaimStakingRewardsData;

        try {
          data = await slotAuctionSdk.claimStakingRewards(
            polkadotAccount,
            loanId,
            'ERC20',
          );
        } catch (e: any) {
          throw new Error(e.message);
        }

        return data;
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onSuccess: (
        request: IReq,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): IReq => {
        const { dispatchRequest } = store;

        dispatchRequest(fetchMyRewardCrowdloans());

        return request;
      },
    },
  }),
);
