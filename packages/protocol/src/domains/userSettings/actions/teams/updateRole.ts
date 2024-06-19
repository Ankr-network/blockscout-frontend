import {
  GroupUserRole,
  IUpdateGroupMemberRoleParams,
  IUpdateGroupMemberRoleResponse,
  Web3Address,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { getUserRoleName } from 'modules/groups/utils/getUserRoleName';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

export const TRANSFER_OWNERSHIP_MUTATION_KEY = 'transferOwnership';

export const buildTransferOwnershipRequestKey = (groupAddress: Web3Address) => {
  return `${TRANSFER_OWNERSHIP_MUTATION_KEY}_${groupAddress}`;
};

export interface IUpdateRoleMutationArgs extends IUpdateGroupMemberRoleParams {
  email?: string;
}

export const {
  endpoints: { updateRole },
  useUpdateRoleMutation,
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
        { email, role, userAddress },
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
            message: isOwnershipChanged
              ? ownershipTransferMessage
              : commonTransferMessage,
            severity: 'success',
          }),
        );
      },
    }),
  }),
  overrideExisting: true,
});
