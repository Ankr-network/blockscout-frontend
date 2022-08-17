import { ICountersEntity } from 'multirpc-sdk';
import { ClientEntity } from '../../types';
import { useMultiRpcSdk } from '../index';
import { LocalGridStore, useLocalGridStore } from '../LocalGridStore';
import { makeClients } from './utils';

type Counters = ICountersEntity[] | null;
interface IUseClients {
  gridStore: LocalGridStore<ClientEntity>;
  counters: Counters;
}

let counters: Counters = null;

export const useClients = (): IUseClients => {
  const backofficeApi = useMultiRpcSdk().getBackofficeGateway();
  const workerApi = useMultiRpcSdk().getBackofficeGateway();

  const gridStore = useLocalGridStore<ClientEntity>(async (cursor, limit) => {
    const { balances, cursor: responseCursor } =
      await backofficeApi.getBalances({
        cursor,
        limit,
      });

    if (!counters) {
      counters = await workerApi.getCounters();
    }

    const clients: ClientEntity[] = makeClients(balances, counters);

    return [clients, responseCursor !== '-1'];
  }, []);

  return { gridStore, counters };
};
