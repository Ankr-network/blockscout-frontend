import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { ClientMapped } from '../store/clientsSlice';
import { getClientType } from '../utils/getClientType';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';
import BigNumber from 'bignumber.js';

interface IApiResponse {
  counters?: ClientMapped[];
}

export const {
  useFetchCountersQuery,
  endpoints: { fetchCounters },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchCounters: build.query<IApiResponse, void>({
      queryFn: async () => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const counters = await backofficeGateway.getCounters();
        const emails = await backofficeGateway.getEmailBindings({
          limit: 500,
        });
        const balances = await backofficeGateway.getBalances({
          limit: 500,
        });
        const clients = counters.map(c => {
          const userBalances = balances.balances.find(
            i => i.address === c.address,
          );
          return {
            ...c,
            clientType: getClientType(c.ttl),
            email: emails.bindings?.find(i => i.address === c.address)?.email,
            createdDate: new Date(c.timestamp),
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
