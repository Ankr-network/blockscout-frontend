import { action, makeAutoObservable } from 'mobx';
import { useMemo } from 'react';

import { connect } from 'auth/connect';
import { clearAuthData } from 'auth/clearAuthData';
import { MultiService } from 'api/MultiService';
import { MultiRpcSdk } from 'multirpc-sdk';
import { getProvider, ProviderEvents } from '@ankr.com/provider';

const PROVIDER_EVENTS = [
  ProviderEvents.AccountsChanged,
  ProviderEvents.ChainChanged,
  ProviderEvents.Disconnect,
];

export class AuthStore {
  public isLoading = false;

  public isLoaded = false;

  // @ts-ignore
  public service: MultiRpcSdk;

  public address?: string;

  public constructor() {
    makeAutoObservable(this);
  }

  @action
  connect = async (): Promise<void> => {
    if (this.isLoaded) return;

    this.isLoading = true;

    const isConnected = await connect();
    this.service = await MultiService.getInstance();

    if (!isConnected) {
      this.disconnect();

      return;
    }

    this.address = this.service.getKeyProvider()?.currentAccount;

    this.isLoading = false;
    this.isLoaded = true;

    this.subscribeProviderEvents();
  };

  @action
  disconnect = async (): Promise<void> => {
    this.isLoading = false;
    this.isLoaded = false;
    this.address = '';

    clearAuthData();

    this.unsubscribeProviderEvents();

    this.service.getKeyProvider().disconnect();
    this.service.getBackofficeGateway().removeToken();
    MultiService.removeInstance();
  };

  getProvider() {
    const web3 = this.service.getKeyProvider().getWeb3();

    return getProvider(web3.currentProvider);
  }

  @action
  subscribeProviderEvents() {
    const provider = this.getProvider();

    if (!provider) return;

    PROVIDER_EVENTS.forEach(value =>
      provider.on(value, () => this.disconnect()),
    );
  }

  @action
  unsubscribeProviderEvents() {
    const provider = this.getProvider();

    if (!provider) return;

    PROVIDER_EVENTS.forEach(value => provider.removeAllListeners(value));
  }
}

export const authStore = new AuthStore();

export const useAuthStore = () => {
  return useMemo(() => authStore, []);
};
