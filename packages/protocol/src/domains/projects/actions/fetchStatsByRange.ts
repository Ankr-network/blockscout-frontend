import { getTime, subDays } from 'date-fns';
import { StatsByRangeResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

interface GetStatsByRangeParams {
  userEndpointToken: string;
  group?: string;
}

const getRange = () => {
  const to = getTime(new Date());
  const from = getTime(subDays(to, 1));

  return { to, from };
};

export const {
  endpoints: { fetchStatsByRange },
  useFetchStatsByRangeMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchStatsByRange: build.mutation<
      StatsByRangeResponse,
      GetStatsByRangeParams
    >({
      queryFn: async ({ group, userEndpointToken }) => {
        const service = MultiService.getService().getAccountGateway();

        const statsByRange = await service.getUserStatsByRange({
          group,
          token: userEndpointToken,
          ...getRange(),
        });

        return { data: statsByRange };
      },
    }),
  }),
  overrideExisting: true,
});
