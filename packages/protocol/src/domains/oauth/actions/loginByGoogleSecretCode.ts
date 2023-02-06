import { EthAddressType } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { Web2ConnectTrackingParams } from 'modules/analytics/mixpanel/types';
import {
  buildSecretCodeData,
  getEthUserAddress,
  getSecreteCodeAndState,
} from './loginByGoogleSecretCodeUtils';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { getAxiosAccountErrorMessage } from 'store/utils/getAxiosAccountErrorMessage';
import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';
import { oauthHasDepositTransaction } from './hasDepositTransaction';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { trackWeb2ConnectFailure } from 'modules/analytics/mixpanel/trackWeb2ConnectFailure';
import { trackWeb2ConnectSuccess } from 'modules/analytics/mixpanel/trackWeb2ConnectSuccess';
import { userSettingsGetActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';
import { web3Api } from 'store/queries';
import { oauthHasVoucherTransaction } from './hasVoucherTransaction';
import { oauthWatchForTheDepositTransation } from './watchForTheDepositTransation';
import { oauthWatchForTheVoucherTransactionAndNegativeBalance } from './watchForTheVoucherTransactionAndNegativeBalance';

export type EmptyObject = Record<string, unknown>;

const getTrackingParams = (getState: GetState): Web2ConnectTrackingParams => {
  const { credentials, email, hasOauthUserDepositTransaction } = selectAuthData(
    getState(),
  );

  const hasPremium = Boolean(credentials || hasOauthUserDepositTransaction);

  return { email, hasPremium };
};

export const {
  endpoints: { oauthLoginByGoogleSecretCode },
  useLazyOauthLoginByGoogleSecretCodeQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginByGoogleSecretCode: build.query<EmptyObject, void>({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async (_args, { dispatch, getState }) => {
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
          service.getOauthGateway().addToken(authorizationToken);
          service.getAccountGateway().addToken(authorizationToken);

          if (ethAddressType === EthAddressType.Generated) {
            const syntheticTokenData = await service
              .getOauthGateway()
              .getSyntheticJwtToken();

            const { jwtToken, workerTokenData } =
              await web3ReadService.upgradeSyntheticJwtToken(
                syntheticTokenData?.jwt_data,
              );

            if (workerTokenData?.signedToken) {
              service
                .getWorkerGateway()
                .addJwtToken(workerTokenData?.signedToken);
            }

            const [
              { data: hasDepositTransaction },
              { data: hasVoucherTransaction },
            ] = await Promise.all([
              dispatch(oauthHasDepositTransaction.initiate()),
              dispatch(oauthHasVoucherTransaction.initiate()),
            ]);

            const hasOauthUserDepositTransaction =
              hasDepositTransaction || hasVoucherTransaction;

            dispatch(
              setAuthData({
                address,
                authorizationToken,
                credentials: jwtToken,
                encryptionPublicKey,
                ethAddressType,
                hasOauthLogin: true,
                workerTokenData,
                hasOauthUserDepositTransaction,
                hasVoucherTransaction,
              }),
            );

            if (!hasOauthUserDepositTransaction) {
              dispatch(oauthWatchForTheDepositTransation.initiate());
            } else if (!hasDepositTransaction && hasVoucherTransaction) {
              dispatch(
                oauthWatchForTheVoucherTransactionAndNegativeBalance.initiate(),
              );
            }
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

          trackWeb2ConnectSuccess(getTrackingParams(getState as GetState));

          return { data: {} };
        },
        errorHandler: (error, _args, { getState }) => {
          trackWeb2ConnectFailure(getTrackingParams(getState as GetState));

          if (isAxiosAccountError(error)) {
            return { error: getAxiosAccountErrorMessage(error) };
          }

          return {
            error: new Error(t('oauth.secret-code-error')),
          };
        },
      }),
    }),
  }),
});
