import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { AuthProviderEnum } from 'multirpc-sdk';

import {
  IUpdateSecretCodeResponse,
  useUpdateSecretCodeMutation,
} from 'modules/signIn/actions/updateSecretCode';
import { IMutationResponse } from 'modules/common/types';

import { useFetchExternalEmailQuery } from '../actions/fetchExternalEmail';

export const useAuthData = () => {
  const location = useLocation();
  const [updateSecretCode] = useUpdateSecretCodeMutation();
  const { refetch: refetchExternalEmail } = useFetchExternalEmailQuery();

  const updateToken = useCallback(
    async (code: string) => {
      try {
        const { error } = (await updateSecretCode({
          provider: AuthProviderEnum.AUTH_PROVIDER_GOOGLE,
          secretCode: code,
        })) as IMutationResponse<IUpdateSecretCodeResponse>;

        if (error) return;

        refetchExternalEmail();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      }
    },
    [refetchExternalEmail, updateSecretCode],
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const codeParam = searchParams.get('code');

    if (codeParam) {
      updateToken(codeParam);
    }
  }, [location, updateToken]);
};
