import { MultiService } from 'modules/api/MultiService';
import { TwoFAStatus } from 'multirpc-sdk';
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

        const data = await service.getAccountGateway().getTwoFAStatus();

        return {
          data: {
            status: data['2FAs']?.[0]?.status,
          },
        };
      },
    }),
  }),
});
