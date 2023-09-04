import {
  EmailConfirmationStatus,
  ICounterResponse,
  IEmailBindingEntity,
  IUserTokensResponseEntity,
  Web3Address,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { ClientMapped } from '../store/clientsSlice';
import { getClientType } from '../utils/getClientType';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import { mapBalances } from '../utils/mapBalances';
import { ClientBalancesMapped } from '../types';

export const {
  useFetchUserByAddressQuery,
  useLazyFetchUserByAddressQuery,
  endpoints: { fetchUserByAddress },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserByAddress: build.query<ClientMapped, Web3Address>({
      queryFn: async (address: Web3Address) => {
        const addressLower = address.toLowerCase();

        let emailData: IEmailBindingEntity = {
          address: '',
          email: '',
          status: EmailConfirmationStatus.PENDING,
        };
        let balanceData: ClientBalancesMapped = {};
        let tokenData: IUserTokensResponseEntity[] = [];
        let counter: ICounterResponse = {
          delta: 0,
          hourly: 0,
          monthly: 0,
          timestamp: 0,
          user: '',
          daily: 0,
        };

        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const fetchEmail = async () => {
          try {
            const emails = await backofficeGateway.getEmailBindings({
              filter_type: 'address',
              filter: addressLower,
            });

            if (emails?.bindings?.length) {
              emailData = { ...emails.bindings[0] };
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
          }
        };

        const fetchBalances = async () => {
          try {
            const balances = await backofficeGateway.getBalances({
              search: addressLower,
            });

            if (balances.balances.length) {
              balanceData = mapBalances(balances.balances[0]);
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
          }
        };

        const fetchTokens = async () => {
          try {
            const tokens = await backofficeGateway.getUserTokens({
              address: addressLower,
            });

            if (tokens.tokens.length) {
              tokenData = tokens.tokens;
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
          }
        };

        const fetchCounter = async () => {
          try {
            if (tokenData && !!tokenData[0]) {
              counter = await backofficeGateway.getCounter({
                user: tokenData[0].token,
              });
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
          }
        };

        await Promise.all([
          fetchEmail(),
          fetchBalances(),
          await fetchTokens(),
          fetchCounter(),
        ]);

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
