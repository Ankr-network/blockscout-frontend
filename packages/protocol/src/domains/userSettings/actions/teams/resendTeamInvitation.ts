import {
  ICancelGroupInvitationParams,
  IManageGroupInvitationResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { resendTeamInvitation },
  useResendTeamInvitationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    resendTeamInvitation: build.mutation<
      IManageGroupInvitationResponse,
      ICancelGroupInvitationParams
    >({
      queryFn: createNotifyingQueryFn(async args => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.resendGroupInvitation(args);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});
