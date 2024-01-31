import {
  ICancelGroupInvitationParams,
  IManageGroupInvitationResponse,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const {
  endpoints: { revokeInvitation },
  useRevokeInvitationMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    revokeInvitation: build.mutation<
      IManageGroupInvitationResponse,
      ICancelGroupInvitationParams
    >({
      invalidatesTags: [RequestType.UserGroupDetails],
      queryFn: createNotifyingQueryFn(async args => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.cancelGroupInvitation(args);

        return { data };
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          NotificationActions.showNotification({
            message: t('common.success-message'),
            severity: 'success',
          }),
        );
      },
    }),
  }),
  overrideExisting: true,
});
