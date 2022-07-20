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

  public constructor() {
    makeAutoObservable(this);
  }

  @action
  async connect(): Promise<void> {
    if (this.isLoaded) return;

    this.isLoading = true;

    await connect();

    this.service = await MultiService.getInstance();

    this.isLoading = false;
    this.isLoaded = true;

    this.subscribeProviderEvents();
  }

  @action
  async reconnect(): Promise<void> {
    this.isLoading = false;
    this.isLoaded = false;

    clearAuthData();

    this.unsubscribeProviderEvents();

    this.service.getKeyProvider().disconnect();
    this.service.getBackofficeGateway().removeToken();
    MultiService.removeInstance();

    await this.connect();
  }

  getProvider() {
    const web3 = this.service.getKeyProvider().getWeb3();

    return getProvider(web3.currentProvider);
  }

  @action
  subscribeProviderEvents() {
    const provider = this.getProvider();

    if (!provider) return;

    PROVIDER_EVENTS.forEach(value =>
      provider.on(value, () => this.reconnect()),
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
