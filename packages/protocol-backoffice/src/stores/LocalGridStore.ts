import { TablePaginationConfig } from 'antd';
import { action, computed, makeAutoObservable } from 'mobx';
import { DependencyList, useEffect, useMemo } from 'react';
import { authStore } from './AuthStore';

export type LocalGridStoreDataHandler<T> = (
  cursor: number,
  limit: number,
) => Promise<[T[], boolean]>;

const EXPIRED_TOKEN_ERROR = 'this token has already expired';

export class LocalGridStore<T> {
  public currentPage = 0;

  public pageSize = 500;

  public items: T[] = [];

  public isLoading = false;

  public hasMore = false;

  public constructor(
    private readonly dataHandler: LocalGridStoreDataHandler<T>,
  ) {
    makeAutoObservable(this);
  }

  @computed
  get paginationConfig(): TablePaginationConfig {
    // eslint-disable-next-line
    const that = this;
    const config: TablePaginationConfig = {
      current: this.currentPage + 1,
      onChange(page: number, pageSize: number) {
        const prevCurrentPage = that.currentPage;
        that.currentPage = page - 1;
        if (pageSize) that.pageSize = pageSize;
        // if we have enough data then just open this page
        // if (that.items.length > that.pageSize) {
        /* TODO:
          working partially (on resize only) due to data replacement
          bug when switching from 100 pageSize & hasMore to 10 and going the last page
          becomes: this.hasMore === false
        */
        //   return;
        // }

        that.isLoading = true;
        // noinspection JSIgnoredPromiseFromCall
        that
          .fetchItems()
          .catch(e => {
            // eslint-disable-next-line no-console
            console.error(e, 'FAILED TO FETCH');
            that.currentPage = prevCurrentPage;
          })
          .finally(() => {
            that.isLoading = false;
          });
      },
      pageSize: this.pageSize,
      pageSizeOptions: ['10', '50', '100', '500'],
      showSizeChanger: true,
    };
    if (this.items.length > this.pageSize) {
      config.total = this.items.length;
    } else if (this.currentPage > 0) {
      config.total =
        (this.currentPage + 1) * this.pageSize + (this.hasMore ? 1 : 0);
    } else {
      config.total = this.hasMore ? this.pageSize + 1 : this.items.length;
    }
    return config;
  }

  @action
  async fetchItems(): Promise<void> {
    this.isLoading = true;

    try {
      const [newItems, hasMore] = await this.dataHandler(
        this.currentPage * this.pageSize,
        this.pageSize,
      );
      this.hasMore = hasMore;
      this.items = newItems || [];
    } catch (error: any) {
      if (error?.response?.data === EXPIRED_TOKEN_ERROR) {
        authStore.disconnect();
      }
    }

    this.isLoading = false;

    // TODO: why exclude the last if hasMore?
    // if (hasMore) {
    //   newItems = newItems.slice(0, newItems.length - 1);
    // }
  }

  @action
  removeItems(): void {
    this.hasMore = false;
    this.items = [];
  }
}

export const useLocalGridStore = <T>(
  dataHandler: LocalGridStoreDataHandler<T>,
  deps: DependencyList | undefined = [],
): LocalGridStore<T> => {
  const store = useMemo(() => {
    return new LocalGridStore<T>(dataHandler);
    // eslint-disable-next-line
  }, deps);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    store.fetchItems();
    return () => store.removeItems();
  }, [store]);

  return store;
};
