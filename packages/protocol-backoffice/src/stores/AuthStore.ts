import { action, makeAutoObservable } from 'mobx';
import { useMemo } from 'react';

import { connect } from 'auth/connect';
import { clearAuthData } from 'auth/clearAuthData';
import { MultiService } from 'api/MultiService';
import { MultiRpcSdk } from 'multirpc-sdk';

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
  }

  @action
  async reconnect(): Promise<void> {
    this.isLoading = false;
    this.isLoaded = false;

    clearAuthData();

    this.connect();
  }
}

export const authStore = new AuthStore();

export const useAuthStore = () => {
  return useMemo(() => authStore, []);
};
