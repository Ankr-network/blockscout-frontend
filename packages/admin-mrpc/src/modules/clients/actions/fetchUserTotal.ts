import { IGetUserTotalResponse, Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IApiRequestParams {
  address: Web3Address;
}

export interface IGetUserTotalMapped extends IGetUserTotalResponse {
  startedDate?: Date;
}

export const {
  useFetchUserTotalQuery,
  endpoints: { fetchUserTotal },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserTotal: build.query<IGetUserTotalMapped, IApiRequestParams>({
      queryFn: async ({ address }) => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const total = await backofficeGateway.getUserTotal({
          address,
        });

        return {
          data: {
            ...total,
            startedDate: total?.blockchainsInfo?.startedMs
              ? new Date(+total.blockchainsInfo.startedMs)
              : undefined,
          },
        };
      },
    }),
  }),
});
