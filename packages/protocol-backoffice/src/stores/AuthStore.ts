import { action, makeAutoObservable } from 'mobx';
import { useMemo } from 'react';

import { connect } from 'auth/connect';
import { clearAuthData } from 'auth/clearAuthData';

export class AuthStore {
  public isLoading = false;

  public isLoaded = false;

  public constructor() {
    makeAutoObservable(this);
  }

  @action
  async connect(): Promise<void> {
    if (this.isLoaded) return;

    this.isLoading = true;

    await connect();

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
