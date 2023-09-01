import { ICounterResponse, Web3Address } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { ClientMapped } from '../store/clientsSlice';
import { getClientType } from '../utils/getClientType';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { mapBalances } from '../utils/mapBalances';

export const {
  useFetchUserByAddressQuery,
  useLazyFetchUserByAddressQuery,
  endpoints: { fetchUserByAddress },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserByAddress: build.query<ClientMapped, Web3Address>({
      queryFn: async (address: Web3Address) => {
        const addressLower = address.toLowerCase();

        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const emails = await backofficeGateway.getEmailBindings({
          filter_type: 'address',
          filter: addressLower,
        });
        const emailData = !!emails?.bindings?.length && emails.bindings[0];

        const balances = await backofficeGateway.getBalances({
          search: addressLower,
        });
        const balanceData =
          !!balances.balances.length && mapBalances(balances.balances[0]);

        const tokens = await backofficeGateway.getUserTokens({
          address: addressLower,
        });
        const tokenData = tokens.tokens;

        let counter: ICounterResponse = {
          delta: 0,
          hourly: 0,
          monthly: 0,
          timestamp: 0,
          user: '',
          daily: 0,
        };

        if (tokenData && !!tokenData[0]) {
          counter = await backofficeGateway.getCounter({
            user: tokenData[0].token,
          });
        }

        return {
          data: {
            ...emailData,
            ...balanceData,
            ...counter,
            address: addressLower,
            ttl: counter.ttl && counter.ttl > 0 ? counter.ttl : undefined,
            clientType: getClientType({
              ttl: counter.ttl,
              hash: counter.hash,
              walletAddress: addressLower,
              suspended: counter.suspended,
            }),
            createdDate: new Date(counter.timestamp),
            tokens: tokenData,
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});
