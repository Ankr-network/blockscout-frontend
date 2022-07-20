import { ICountersEntity } from 'multirpc-sdk';
import { useMultiRpcSdk } from '../index';
import { LocalGridStore, useLocalGridStore } from '../LocalGridStore';
import { PremiumPlanClientEntity } from './types';
import { makeClients } from './utils';

let counters: ICountersEntity[] | null = null;

export const usePremiumPlanClients =
  (): LocalGridStore<PremiumPlanClientEntity> => {
    const workerApi = useMultiRpcSdk().getBackofficeGateway();

    const gridStore = useLocalGridStore<PremiumPlanClientEntity>(async () => {
      if (!counters) {
        counters = await workerApi.getCounters();
      }

      const clients: PremiumPlanClientEntity[] = makeClients(counters);

      return [clients, true];
    }, []);

    return gridStore;
  };
