import { EthAddressType } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import {
  buildSecretCodeData,
  getEthUserAddress,
  getSecreteCodeAndState,
} from './loginByGoogleSecretCodeUtils';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { setAuthData } from 'domains/auth/store/authSlice';
import { userSettingsGetActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';
import { web3Api } from 'store/queries';

export const {
  endpoints: { oauthLoginByGoogleSecretCode },
  useLazyOauthLoginByGoogleSecretCodeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginByGoogleSecretCode: build.query<void, void>({
      queryFn: createNotifyingQueryFn(async (_args, { dispatch }) => {
        const { code, state } = getSecreteCodeAndState();

        if (!code) {
          throw new Error('Wrong secret code');
        }

        const secretCodeData = buildSecretCodeData(code, state || '');

        const service = MultiService.getService();

        const loginUserByGoogleSecretCodeResult = await service
          .getOauthGateway()
          .loginUserByGoogleSecretCode(secretCodeData);

        const { access_token: authorizationToken } =
          loginUserByGoogleSecretCodeResult;

        const { addresses } = await service
          .getOauthGateway()
          .getETHAddresses(authorizationToken);

        const ethUserAddress = getEthUserAddress(addresses);

        if (!ethUserAddress) {
          throw new Error('No ethUserAddress');
        }

        const {
          address,
          type: ethAddressType,
          public_key: encryptionPublicKey,
        } = ethUserAddress;

        const web3ReadService = await MultiService.getWeb3ReadService();

        web3ReadService.getOauthGateway().addToken(authorizationToken);
        service.getAccountGateway().addToken(authorizationToken);

        if (ethAddressType === EthAddressType.Generated) {
          const { jwtToken, workerTokenData } =
            await web3ReadService.getIssuedJwtTokenOrIssue(
              ethUserAddress?.address as string,
              ethUserAddress?.public_key as string,
            );

          if (workerTokenData?.signedToken) {
            service
              .getWorkerGateway()
              .addJwtToken(workerTokenData?.signedToken);
          }

          dispatch(
            setAuthData({
              address,
              authorizationToken,
              credentials: jwtToken,
              encryptionPublicKey,
              ethAddressType,
              hasOauthLogin: true,
              workerTokenData,
            }),
          );
        }

        if (ethAddressType === EthAddressType.User) {
          const jwtToken = await web3ReadService.getIssuedJwtToken(address);

          dispatch(
            setAuthData({
              address,
              authorizationToken,
              credentials: jwtToken,
              encryptionPublicKey,
              ethAddressType,
              hasOauthLogin: true,
            }),
          );
        }

        const { data } = await dispatch(
          userSettingsGetActiveEmailBinding.initiate({
            params: undefined as void,
            shouldNotify: false,
          }),
        );

        dispatch(
          setAuthData({
            address:
              ethAddressType === EthAddressType.User ? data?.address : '',
            email: data?.email,
          }),
        );

        return { data: undefined };
      }),
      onQueryStarted: async (_args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          throw new Error('Wrong secret code. Try to sign up again');
        }
      },
    }),
  }),
});
