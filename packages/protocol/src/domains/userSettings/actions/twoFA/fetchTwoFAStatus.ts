import { TwoFAStatus } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export interface UserSettingsTwoFAStatusResult {
  status: TwoFAStatus;
}

export const {
  endpoints: { userSettingsFetchTwoFAStatus },
  useLazyUserSettingsFetchTwoFAStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    userSettingsFetchTwoFAStatus: build.query<
      UserSettingsTwoFAStatusResult,
      void
    >({
      queryFn: async () => {
        const service = MultiService.getService();

        const data = await service.getAccountingGateway().getTwoFAStatus();

        return {
          data: {
            status: data['2FAs']?.[0]?.status,
          },
        };
      },
    }),
  }),
});
