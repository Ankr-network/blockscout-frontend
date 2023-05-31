import { INotificationsSettings } from 'multirpc-sdk';

import { web3Api } from 'store/queries';
import { userSettingsFetchNotificationSettings } from './notifications/fetchNotificationSettings';
import { selectSignupSettings } from '../store/userSettingsSlice';
import { RootState } from 'store';
import { userSettingsEditNotificationSettings } from './notifications/editNotificationSettings';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { selectAuthData } from 'domains/auth/store/authSlice';

export const {
  endpoints: { checkChangedSignupUserSettingsAndUpdate },
  useLazyCheckChangedSignupUserSettingsAndUpdateQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    checkChangedSignupUserSettingsAndUpdate: build.query<
      INotificationsSettings,
      void
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (_arg, { dispatch, getState }) => {
          const { email } = selectAuthData(getState() as RootState);

          if (!email) {
            return { data: {} };
          }

          const { hasMarketing } =
            selectSignupSettings(getState() as RootState) || {};

          if (typeof hasMarketing !== 'boolean') {
            return { data: {} };
          }

          const { data } = await dispatch(
            userSettingsFetchNotificationSettings.initiate(),
          );

          if (data?.marketing !== hasMarketing) {
            const { data: updatedData } = await dispatch(
              userSettingsEditNotificationSettings.initiate({
                ...data,
                marketing: Boolean(hasMarketing),
              }),
            );

            return { data: updatedData };
          }

          return { data };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
    }),
  }),
});
