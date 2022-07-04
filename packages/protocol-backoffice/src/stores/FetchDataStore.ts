import { action, makeAutoObservable } from 'mobx';
import { useMemo } from 'react';

export class FetchDataStore<T> {
  public item?: T;

  public isLoading = false;

  public constructor() {
    makeAutoObservable(this);
  }

  @action
  async refreshItem(p: Promise<T>): Promise<void> {
    const t = setTimeout(() => {
      this.isLoading = true;
    }, 100);

    this.item = await p;
    clearTimeout(t);
    this.isLoading = false;
  }
}

export const useLocalFetchDataStore = <T>(): FetchDataStore<T> => {
  return useMemo(() => {
    return new FetchDataStore<T>();
  }, []);
};
