import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { ICrowdloanType, SlotAuctionSdk } from 'polkadot';

import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';

import { ICrowdloanByStatus, mapCrowdloan } from './fetchCrowdloansByStatus';

export const fetchProjectsListCrowdloans = createAction<
  RequestAction<ICrowdloanType[], ICrowdloanByStatus[]>
>(
  'polkadotSlotAuction/fetchProjectsListCrowdloans',
  (): RequestAction => ({
    request: {
      promise: (async (): Promise<ICrowdloanType[]> => {
        const slotAuctionSdk: SlotAuctionSdk =
          await SlotAuctionSdkSingleton.getInstance();
        const rawData: ICrowdloanType[] =
          await slotAuctionSdk.getAvailableCrowdloans();

        rawData.sort((a: ICrowdloanType, b: ICrowdloanType): number => {
          if (a.status === 'ONGOING' && b.status === 'ONGOING') {
            return 0;
          }

          if (a.status === 'ONGOING' && b.status !== 'ONGOING') {
            return -1;
          }

          if (a.status !== 'ONGOING' && b.status === 'ONGOING') {
            return 1;
          }

          return 0;
        });

        return rawData;
      })(),
    },
    meta: {
      asMutation: false,
      getData: (data: ICrowdloanType[]): ICrowdloanByStatus[] =>
        data.map(mapCrowdloan),
    },
  }),
);
