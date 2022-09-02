import { action, makeAutoObservable, runInAction } from 'mobx';
import {
  IBackofficeGateway,
  IEmailBindingEntity,
  Web3Address,
} from 'multirpc-sdk';
import { useMemo } from 'react';
import { useMultiRpcSdk } from 'stores';

const LIMIT_MAX = 500;

const END_CURSOR = '-1';

type MinimumFieldClient = { email?: string; address?: string };

export class ClientEmailsStore {
  public isLoading = false;

  public clientsEmails: IEmailBindingEntity[] = [];

  private addressToEmailMap: Partial<Record<Web3Address, string>> = {};

  public constructor(
    private emailFetcher: IBackofficeGateway['getEmailBindings'],
  ) {
    makeAutoObservable(this);
  }

  @action
  async fetchAllEmails(): Promise<void> {
    runInAction(() => {
      this.isLoading = true;
    });

    let cursor = '0';

    let res: IEmailBindingEntity[] = [];
    while (cursor !== END_CURSOR) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const data = await this.emailFetcher({ limit: LIMIT_MAX, cursor });

        cursor = data.cursor;

        res = [...res, ...(data.bindings || [])];
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
        break;
      }
    }

    runInAction(() => {
      res.forEach(({ address, email }) => {
        this.addressToEmailMap[address] = email;
      });

      this.isLoading = false;
    });

    this.clientsEmails = res;
  }

  public enrichClientsWithEmails<T extends MinimumFieldClient>(clients: T[]) {
    return clients.map(client =>
      client.address
        ? {
            ...client,
            email: this.addressToEmailMap[client.address],
          }
        : client,
    );
  }
}

export const useClientEmailsStore = () => {
  const backofficeApi = useMultiRpcSdk().getBackofficeGateway();

  const emailStore = useMemo(
    () =>
      new ClientEmailsStore(backofficeApi.getEmailBindings.bind(backofficeApi)),
    [backofficeApi],
  );

  return emailStore;
};
