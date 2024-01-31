import {
  GroupUserRole,
  IUpdateGroupMemberRoleParams,
  IUpdateGroupMemberRoleResponse,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

export interface IUpdateRoleMutationArgs extends IUpdateGroupMemberRoleParams {
  email?: string;
}

export const {
  useUpdateRoleMutation,
  endpoints: { updateRole },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    updateRole: build.mutation<
      IUpdateGroupMemberRoleResponse,
      IUpdateRoleMutationArgs
    >({
      invalidatesTags: [
        RequestType.UserGroupDetails,
        RequestType.GroupCreationAllowance,
      ],
      queryFn: createNotifyingQueryFn(async args => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .updateGroupMemberRole(args);

        return { data };
      }),
      onQueryStarted: async (
        { role, email, userAddress },
        { dispatch, queryFulfilled },
      ) => {
        await queryFulfilled;

        const isOwnershipChanged = role === GroupUserRole.owner;

        const ownershipTransferMessage = t(
          'teams.update-role.notifications.owner-success',
          {
            email: shrinkAddress(email || userAddress),
          },
        );
        const commonTransferMessage = t(
          'teams.update-role.notifications.success',
          {
            newRole: getUserRoleName(role),
          },
        );

        dispatch(
          NotificationActions.showNotification({
            message: isOwnershipChanged ? ownershipTransferMessage : commonTransferMessage,
            severity: 'success',
          }),
        );
      },
    }),
  }),
  overrideExisting: true,
});
