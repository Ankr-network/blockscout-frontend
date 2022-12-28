import { authDisconnect } from 'domains/auth/actions/disconnect';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

const deleteAllCookies = () => {
  document.cookie.split(';').forEach(c => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
};

export const {
  endpoints: { oauthSignout },
  useLazyOauthSignoutQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthSignout: build.query<boolean, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch }) => {
        dispatch(authDisconnect.initiate());

        deleteAllCookies();

        return { data: true };
      }),
    }),
  }),
});
