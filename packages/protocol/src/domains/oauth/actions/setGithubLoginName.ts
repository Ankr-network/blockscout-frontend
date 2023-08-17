import { setAuthData, selectAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';
import { RootState } from 'store';

import { fetchAssociatedAccounts } from './fetchAssociatedAccounts';

export const {
  endpoints: { setGithubLoginName },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    setGithubLoginName: build.query<null, void>({
      queryFn: async (_args, { dispatch, getState }) => {
        const { address } = selectAuthData(getState() as RootState);

        const { data } = await dispatch(fetchAssociatedAccounts.initiate());

        const associatedAccount = data?.find(
          account => account.address.toLowerCase() === address?.toLowerCase(),
        );

        if (associatedAccount) {
          dispatch(
            setAuthData({
              loginName: associatedAccount?.login,
            }),
          );
        }

        return { data: null };
      },
    }),
  }),
});
