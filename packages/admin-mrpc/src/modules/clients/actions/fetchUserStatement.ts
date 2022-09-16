import { IStatementResponse, Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

interface IRequestParams {
  address: Web3Address;
  dayOffset?: string;
}

export const {
  useFetchUserStatementQuery,
  endpoints: { fetchUserStatement },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserStatement: build.query<IStatementResponse, IRequestParams>({
      queryFn: async ({ address, dayOffset = '0' }) => {
        const service = await MultiService.getInstance();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const { statement } = await backofficeGateway.getStatement({
          address,
          day_offset: dayOffset,
        });

        return {
          data: {
            statement,
          },
        };
      },
    }),
  }),
});
