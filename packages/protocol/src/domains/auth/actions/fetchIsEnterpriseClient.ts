import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchIsEnterpriseClient },
  useLazyFetchIsEnterpriseClientQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchIsEnterpriseClient: build.query<boolean, void>({
      queryFn: async () => {
        const service = MultiService.getService();

        const status = await service.getEnterpriseGateway().checkIsClient();

        return { data: status };
      },
    }),
  }),
});
