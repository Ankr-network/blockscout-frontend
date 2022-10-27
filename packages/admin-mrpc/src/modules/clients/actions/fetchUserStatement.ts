import { IStatementResponse, Web3Address } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

/**
 *  dayOffset param means offset in days from current moment for fetching actions for this period
 *  0 returns data for today
 *  1 returns data for yesterday etc.
 */
interface IRequestParams {
  address: Web3Address;
  dayOffset?: '0' | '1' | '2' | '3' | '7' | '30';
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
