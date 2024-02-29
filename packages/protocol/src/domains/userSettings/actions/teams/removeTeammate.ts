import {
  IDeleteGroupMemberParams,
  IUpdateGroupMemberRoleResponse,
} from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RequestType, web3Api } from 'store/queries';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

interface IRemoveTeammateMutationArgs extends IDeleteGroupMemberParams {
  email?: string;
}

export const {
  endpoints: { removeTeammate },
  useRemoveTeammateMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    removeTeammate: build.mutation<
      IUpdateGroupMemberRoleResponse,
      IRemoveTeammateMutationArgs
    >({
      invalidatesTags: [RequestType.UserGroupDetails],
      queryFn: createNotifyingQueryFn(async args => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.removeGroupTeammate(args);

        return { data };
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        const { address, email } = _args;

        dispatch(
          NotificationActions.showNotification({
            message: t('teams.notifications.remove-teammate-success', {
              user: shrinkAddress(email || address),
            }),
            severity: 'success',
          }),
        );
      },
    }),
  }),
  overrideExisting: true,
});
