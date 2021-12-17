import { ICrowdloanType, TCrowdloanStatus } from '@ankr.com/stakefi-polkadot';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

export interface ICrowdloanByStatus
  extends Omit<
    ICrowdloanType,
    'endLease' | 'endTime' | 'startLease' | 'startTime'
  > {
  endLease: Date;
  endTime: Date;
  startLease: Date;
  startTime: Date;
}

export const fetchCrowdloansByStatus = createAction<
  RequestAction<ICrowdloanType[], ICrowdloanByStatus[]>
>('FETCH_CROWDLOANS_BY_STATUS', (status: TCrowdloanStatus) => ({
  request: {
    promise: (async (): Promise<ICrowdloanType[]> => {
      const slotAuctionSdk = SlotAuctionSdkSingleton.getInstance();
      return slotAuctionSdk.getCrowdloansByStatus(status);
    })(),
  },
  meta: {
    asMutation: false,
    getData: data => data.map(mapCrowdloan),
  },
}));

export const mapCrowdloan = (data: ICrowdloanType): ICrowdloanByStatus => {
  return {
    ...data,
    endLease: new Date(data.endLease * 1000),
    endTime: new Date(data.endTime * 1000),
    startLease: new Date(data.startLease * 1000),
    startTime: new Date(data.startTime * 1000),
  };
};
