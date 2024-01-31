import {
  InviteGroupMemeberParams,
  InviteGroupMemeberResult,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const {
  endpoints: { inviteTeamMember },
  useInviteTeamMemberMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    inviteTeamMember: build.mutation<
      InviteGroupMemeberResult,
      InviteGroupMemeberParams
    >({
      invalidatesTags: [RequestType.UserGroupDetails],
      queryFn: createNotifyingQueryFn(async params => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.inviteGroupMember(params);

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
