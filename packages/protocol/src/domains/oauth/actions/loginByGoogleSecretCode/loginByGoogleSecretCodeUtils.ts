import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { EthAddressType, IEthUserAddress } from 'multirpc-sdk';

import { GetState } from 'store';
import { Web2ConnectTrackingParams } from 'modules/analytics/mixpanel/types';
import { checkDepositOrVoucherTransaction } from '../checkDepositOrVoucherTransaction';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { selectHasPremium } from 'domains/auth/store/selectors';
import { trackWeb2ConnectSuccess } from 'modules/analytics/mixpanel/trackWeb2ConnectSuccess';

export interface SecreteCodeAndState {
  code: string | null;
  state: string | null;
}

export interface SecretCodeData {
  secret_code: string;
  state: string;
}

export const getSecreteCodeAndState = (): SecreteCodeAndState => {
  const redirectedURL = new URL(window.location.href);

  return {
    code: redirectedURL.searchParams.get('code'),
    state: redirectedURL.searchParams.get('state'),
  };
};

export const buildSecretCodeData = (
  secretCode: string,
  state = '',
): SecretCodeData => ({
  secret_code: secretCode,
  state,
});

export const getEthUserAddress = (addresses: IEthUserAddress[]) => {
  const userAddress = addresses.find(item => item.type === EthAddressType.User);

  if (userAddress) return userAddress;

  return addresses.find(item => item.type === EthAddressType.Generated);
};

export const getTrackingParams = (
  getState: GetState,
): Web2ConnectTrackingParams => {
  const state = getState();
  const { email } = selectAuthData(state);
  const hasPremium = selectHasPremium(state);

  return { email, hasPremium };
};

export const trackLoginSuccess = async ({
  dispatch,
  getState,
}: Pick<BaseQueryApi, 'dispatch' | 'getState'>) => {
  await dispatch(checkDepositOrVoucherTransaction.initiate());

  trackWeb2ConnectSuccess(getTrackingParams(getState as GetState));
};
