import { InitTwoFAResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export interface UserSettingsSetupTwoFAResult {
  passcode: string;
  qrCode: string;
  issuer: string;
  account: string;
}

const getData = (data: InitTwoFAResponse): UserSettingsSetupTwoFAResult => {
  return {
    passcode: data.passcode,
    qrCode: data.qr_code,
    issuer: data.issuer,
    account: data.account,
  };
};

export const {
  endpoints: { setupTwoFA },
  useSetupTwoFAMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    setupTwoFA: build.mutation<UserSettingsSetupTwoFAResult, void>({
      queryFn: async () => {
        const service = MultiService.getService();

        const data = await service.getAccountingGateway().initTwoFA();

        return { data: getData(data) };
      },
    }),
  }),
});
