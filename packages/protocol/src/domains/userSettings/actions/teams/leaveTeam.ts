import { IApiUserGroupParams, ILeaveGroupResponse } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { selectUserGroups } from 'domains/userGroup/store';
import { RootState } from 'store';

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
      onQueryStarted: async (
        { group = '' },
        { dispatch, queryFulfilled, getState },
      ) => {
        const userGroups = selectUserGroups(getState() as RootState);
        const currentGroup = userGroups.find(
          userGroup => userGroup.address.toLowerCase() === group.toLowerCase(),
        );
        const currentGroupName = currentGroup?.name;

        const response = await queryFulfilled;

        if (response?.data?.result) {
          dispatch(
            NotificationActions.showNotification({
              message: t('teams.leave-team.success-message', {
                teamName: currentGroupName,
              }),
              severity: 'success',
            }),
          );
        } else {
          dispatch(
            NotificationActions.showNotification({
              message: t('common.error-message'),
              severity: 'error',
            }),
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});
