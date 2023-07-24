import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

import { topUpResetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';

export const {
  useLazyTopUpRedirectIfCredentialsQuery,
  endpoints: { topUpRedirectIfCredentials },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpRedirectIfCredentials: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const { credentials, workerTokenData, isInstantJwtParticipant } =
          selectAuthData(getState() as RootState);

        const shouldRedirect =
          (credentials && workerTokenData?.userEndpointToken) ||
          isInstantJwtParticipant;

        if (shouldRedirect) {
          dispatch(topUpResetTransactionSliceAndRedirect.initiate());

          return { data: true };
        }

        return { data: false };
      }),
    }),
  }),
});
