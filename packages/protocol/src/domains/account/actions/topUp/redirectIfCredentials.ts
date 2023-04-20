import { GetState, RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { resetTransactionSliceAndRedirect } from './resetTransactionSliceAndRedirect';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';
import { getCurrentTransactionAddress } from 'domains/account/utils/getCurrentTransactionAddress';

export const {
  useLazyTopUpRedirectIfCredentialsQuery,
  endpoints: { topUpRedirectIfCredentials },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    topUpRedirectIfCredentials: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { getState, dispatch }) => {
        const address = await getCurrentTransactionAddress(
          getState as GetState,
        );

        const { credentials, workerTokenData, isInstantJwtParticipant } =
          selectAuthData(getState() as RootState);

        const shouldRedirect =
          (credentials && workerTokenData?.userEndpointToken) ||
          isInstantJwtParticipant;

        if (shouldRedirect) {
          resetTransactionSliceAndRedirect(
            dispatch,
            getState as GetState,
            address,
          );

          return { data: true };
        }

        return { data: false };
      }),
    }),
  }),
});
