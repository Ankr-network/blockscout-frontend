import BigNumber from 'bignumber.js';
import {
  IBalancesEntity,
  ICountersEntity,
  IEmailBindingEntity,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { ClientMapped } from '../store/clientsSlice';
import { getClientType } from '../utils/getClientType';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IApiResponse {
  counters?: ClientMapped[];
  cursor?: string;
}

export const {
  useFetchCountersQuery,
  endpoints: { fetchCounters },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchCounters: build.query<IApiResponse, void>({
      queryFn: async () => {
        let emailsCollection: IEmailBindingEntity[] = [];
        let countersCollection: ICountersEntity[] = [];
        let balancesCollection: IBalancesEntity[] = [];
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();

        // TODO: tmp fix while waiting for backend features with filtered and sorted request for counters
        // https://ankrnetwork.atlassian.net/browse/MRPC-1655
        const fetchAllCounters = async () => {
          let cursor: string | undefined = '0';
          while (cursor && cursor !== '-1') {
            try {
              // @ts-ignore
              const counters =
                // eslint-disable-next-line no-await-in-loop
                await backofficeGateway.getCounters({ cursor });
              cursor = counters.cursor;

              countersCollection = [
                ...countersCollection,
                ...(counters.result || []),
              ];
            } catch (e) {
              // eslint-disable-next-line no-console
              console.warn(e);
              break;
            }
          }
        };

        // TODO: tmp fix while waiting for backend features with filtered and sorted request for counters
        // https://ankrnetwork.atlassian.net/browse/MRPC-1655
        const fetchAllEmails = async () => {
          let cursor: string | undefined = '0';
          while (cursor && cursor !== '-1') {
            try {
              // @ts-ignore
              const emails =
                // eslint-disable-next-line no-await-in-loop
                await backofficeGateway.getEmailBindings({
                  limit: 500,
                  cursor,
                });
              cursor = emails.cursor;

              emailsCollection = [
                ...emailsCollection,
                ...(emails.bindings || []),
              ];
            } catch (e) {
              // eslint-disable-next-line no-console
              console.warn(e);
              break;
            }
          }
        };

        // TODO: tmp fix while waiting for backend features with filtered and sorted request for counters
        // https://ankrnetwork.atlassian.net/browse/MRPC-1655
        const fetchAllBalances = async () => {
          let cursor: string | number | undefined = '0';
          while (cursor && cursor !== '-1' && cursor !== -1) {
            try {
              // @ts-ignore
              const balances =
                // eslint-disable-next-line no-await-in-loop
                await backofficeGateway.getBalances({
                  limit: 500,
                  cursor: +cursor,
                });
              cursor = balances.cursor;
              // TODO: Current API Credit Balance	= Credit Ankr Amount + Credit Voucher Amount
              balancesCollection = [
                ...balancesCollection,
                ...(balances.balances || []),
              ];
            } catch (e) {
              // eslint-disable-next-line no-console
              console.warn(e);
              break;
            }
          }
        };

        await fetchAllCounters();
        await fetchAllEmails();
        await fetchAllBalances();

        const clients = countersCollection.map(client => {
          const userBalances = balancesCollection.find(
            balance =>
              balance.address?.toLowerCase() === client.address?.toLowerCase(),
          );
          return {
            ...client,
            ttl: client.ttl && client.ttl > 0 ? client.ttl : undefined,
            clientType: getClientType(client.ttl, client.hash, client.address),
            email: emailsCollection?.find(
              email =>
                email.address?.toLowerCase() === client.address?.toLowerCase(),
            )?.email,
            createdDate: new Date(client.timestamp),
            amount: userBalances?.creditAnkrAmount
              ? new BigNumber(userBalances.creditAnkrAmount)
              : undefined,
            amountAnkr: userBalances?.amountAnkr
              ? new BigNumber(userBalances.amountAnkr)
              : undefined,
            amountUsd: userBalances?.amountUsd
              ? new BigNumber(userBalances.amountUsd)
              : undefined,
            voucherAmount: userBalances?.creditVoucherAmount
              ? new BigNumber(userBalances.creditVoucherAmount)
              : undefined,
          };
        });

        return {
          data: { counters: clients },
        };
      },
    }),
  }),
});
