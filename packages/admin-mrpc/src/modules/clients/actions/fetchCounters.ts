import { web3Api } from 'store/queries/web3Api';
import { store } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { selectAuthData } from 'modules/auth/store/authSlice';
import { TOKEN_LIFETIME } from 'modules/common/const';
import { ClientMapped } from '../store/clientsSlice';
import { getClientType } from '../utils';

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
        let { backofficeAuthorizationToken } = selectAuthData(store.getState());
        if (!backofficeAuthorizationToken) {
          backofficeAuthorizationToken = await service.authorizeBackoffice(
            TOKEN_LIFETIME,
          );
        }
        const backofficeGateway = await service.getBackofficeGateway();
        await backofficeGateway.addToken(backofficeAuthorizationToken);
        const counters = await backofficeGateway.getCounters();
        const emails = await backofficeGateway.getEmailBindings({
          limit: 500,
        });
        const balances = await backofficeGateway.getBalances({
          limit: 500,
        });
        const clients = counters.map(c => {
          return {
            ...c,
            clientType: getClientType(c.ttl),
            email: emails.bindings?.find(i => i.address === c.address)?.email,
            ...balances.balances.find(i => i.address === c.address),
          };
        });

        return {
          data: { counters: clients },
        };
      },
    }),
  }),
});
