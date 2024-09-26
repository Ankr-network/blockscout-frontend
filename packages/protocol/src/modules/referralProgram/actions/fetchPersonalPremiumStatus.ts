import { GetPremiumStatusResult, PremiumStatus } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { selectUserEndpointToken } from 'domains/auth/store';
import { web3Api } from 'store/queries';

// This action should be used to fetch a premium status of a personal group.
// We've already got a similar action in packages/protocol/src/domains/auth/actions/fetchPremiumStatus.ts
// that allows fetching a premium status of any group. But at the momemnt that
// action is cached only by endpoint name, so it means it's impossible to keep
// statuses for a few groups in the store. Turning it to be cachable by params
// may lead to some problems, so that should be done in a separate task
export const {
  endpoints: { fetchPersonalPremiumStatus },
  useFetchPersonalPremiumStatusQuery,
  useLazyFetchPersonalPremiumStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPersonalPremiumStatus: build.query<
      GetPremiumStatusResult | null,
      void
    >({
      queryFn: createNotifyingQueryFn(async (_, { getState }) => {
        const state = getState() as RootState;
        const userEndpointToken = selectUserEndpointToken(state);

        if (userEndpointToken) {
          const api = MultiService.getService().getAccountingGateway();

          const status = await api.getUserEndpointTokenStatus({
            token: userEndpointToken,
          });

          const data: GetPremiumStatusResult = {
            isFreemium: status.freemium,
            status: status.freemium
              ? PremiumStatus.INACTIVE
              : PremiumStatus.ACTIVE,
          };

          return { data };
        }

        return { data: null };
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectData: selectPersonalPremiumStatus,
  selectLoading: selectPersonalPremiumStatusLoading,
  selectState: selectPersonalPremiumStatusState,
} = createQuerySelectors({ endpoint: fetchPersonalPremiumStatus });
