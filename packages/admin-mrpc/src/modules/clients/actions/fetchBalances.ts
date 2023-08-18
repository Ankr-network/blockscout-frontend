import { Web3Address } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { mapBalances } from '../utils/mapBalances';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { ClientBalancesMapped } from '../types';

interface IRequestParams {
  address: Web3Address;
}

export const {
  useFetchBalancesQuery,
  endpoints: { fetchBalances },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchBalances: build.query<ClientBalancesMapped, IRequestParams>({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const userBalances = await backofficeGateway.getBalances({
          search: address,
        });

        const userBalance = userBalances.balances[0];

        return {
          data: mapBalances(userBalance),
        };
      },
    }),
  }),
});
