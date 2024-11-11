import storage from 'redux-persist/lib/storage';
import { EthAddressType, Web3Address } from 'multirpc-sdk';
import { PersistConfig, PersistedState } from 'redux-persist';

import { MultiService } from 'modules/api/MultiService';

import { IAuthSlice } from '../store/authSlice';

interface IOldAuthSlice
  extends Omit<IAuthSlice, 'authAddress' | 'authAddressType'> {
  address?: Web3Address;
  ethAddressType?: EthAddressType;
}

const isOldAuthSlice = (state: unknown): state is IOldAuthSlice =>
  Boolean(
    state &&
      typeof state === 'object' &&
      ('address' in state || 'ethAddressType' in state),
  );

const getAuthToken = (state: unknown) => {
  if (state && typeof state === 'object' && 'authorizationToken' in state) {
    return (state as IAuthSlice).authorizationToken;
  }

  return undefined;
};

export const authPersistConfig: PersistConfig<IAuthSlice> = {
  key: 'auth',
  storage,
  // Should be removed after 01.06.2024, since the majority of users are
  // going to have the migrated state in their local storage
  migrate: state => {
    const authorizationToken = getAuthToken(state);

    if (authorizationToken) {
      const service = MultiService.getService();

      service.getAccountingGateway().addToken(authorizationToken);
      service.getEnterpriseGateway().addToken(authorizationToken);
    }

    if (isOldAuthSlice(state)) {
      const authAddress = state.address;
      const authAddressType = state.ethAddressType;

      const newState: IAuthSlice & PersistedState = {
        ...state,
        authAddress,
        authAddressType,
      };

      return Promise.resolve(newState);
    }

    return Promise.resolve(state);
  },
};
