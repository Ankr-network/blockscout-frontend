import { IGetUserRevenueRequest, IGetUserRevenueResponse } from 'multirpc-sdk';
import BigNumber from 'bignumber.js';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export interface RevenueDataMapped {
  creditsAmount: BigNumber;
  usdAmount: BigNumber;
  ankrAmount: BigNumber;
  usdFact: BigNumber;
  ankrFact: BigNumber;
  totalCreditsAmount: BigNumber;
  totalUsdAmount: BigNumber;
}

const mapRevenueData = (data: IGetUserRevenueResponse): RevenueDataMapped => {
  return {
    creditsAmount: new BigNumber(data.creditsAmount),
    usdAmount: new BigNumber(data.usdAmount),
    ankrAmount: new BigNumber(data.ankrAmount),
    usdFact: new BigNumber(data.usdFact),
    ankrFact: new BigNumber(data.ankrFact),
    totalCreditsAmount: new BigNumber(data.totalCreditsAmount),
    totalUsdAmount: new BigNumber(data.totalUsdAmount),
  };
};

export const {
  useFetchUserRevenueQuery,
  endpoints: { fetchUserRevenue },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserRevenue: build.query<RevenueDataMapped, IGetUserRevenueRequest>({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();
        const userRevenueResponse = await backofficeGateway.getUserRevenue({
          address,
        });

        return {
          data: mapRevenueData(userRevenueResponse),
        };
      },
    }),
  }),
  overrideExisting: true,
});
