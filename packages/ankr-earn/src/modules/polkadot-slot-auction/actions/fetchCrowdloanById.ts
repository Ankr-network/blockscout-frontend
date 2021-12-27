import { RequestAction } from '@redux-requests/core';
import { ICrowdloanType } from 'polkadot';
import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

interface FetchCrowdloanByIdData {
  crowdloan: ICrowdloanType;
  isLoading: boolean;
}

export const fetchCrowdloanById = createAction<
  RequestAction<FetchCrowdloanByIdData, FetchCrowdloanByIdData>
>('FETCH_CROWDLOAN_BY_ID', (loanId: number) => ({
  request: {
    promise: (async () => {
      const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();
      const crowdloan = await slotAuctionSdk.getCrowdloanById(loanId);
      return {
        crowdloan,
        isLoading: false,
      };
    })(),
  },
  meta: {
    asMutation: false,
  },
}));
