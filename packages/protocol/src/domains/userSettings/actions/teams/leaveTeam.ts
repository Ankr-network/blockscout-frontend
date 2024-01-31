import { IApiUserGroupParams, ILeaveGroupResponse } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const {
  endpoints: { leaveTeam },
  useLeaveTeamMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    leaveTeam: build.mutation<ILeaveGroupResponse, IApiUserGroupParams>({
      invalidatesTags: [
        RequestType.UserGroupsList,
        RequestType.GroupCreationAllowance,
      ],
      queryFn: createNotifyingQueryFn(async args => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.leaveTeam(args);

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
